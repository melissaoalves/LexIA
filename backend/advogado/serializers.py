import re
from rest_framework import serializers
from upload.models import Advogado, Escritorio, Causa
from django.contrib.auth.hashers import make_password
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

class AdvogadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advogado
        fields = ['id', 'nome', 'email', 'oab', 'data_admissao', 'escritorio']

class CausaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Causa
        fields = ['id', 'nome_cliente', 'data_criacao', 'status', 'advogados']

class EscritorioSerializer(serializers.ModelSerializer):
    # você pode expor o campo com tamanho até 10 para aceitar o hífen, mas logo abaixo limpa pra 8 dígitos:
    cep = serializers.CharField(max_length=10, allow_blank=True, allow_null=True)

    class Meta:
        model = Escritorio
        fields = [
            'id', 'nome', 'email', 'logo', 'cnpj', 'oab',
            'telefone', 'cep', 'logradouro', 'numero', 'complemento',
            'bairro', 'cidade', 'estado', 'qtd_funcionarios', 'data_criacao'
        ]

    def validate_cep(self, value):
        # permite vazio
        if value in (None, ''):
            return value

        # remove tudo que não for número
        clean = re.sub(r'\D', '', value)

        if len(clean) != 8:
            raise serializers.ValidationError("CEP deve conter exatamente 8 dígitos numéricos.")
        return clean  # aqui gravamos só "59600000" por exemplo

    def update(self, instance, validated_data):
        # cara-a-cara do seu código atual
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # vincula ao user se ainda não tiver
        user = self.context['request'].user
        if not user.escritorio:
            user.escritorio = instance
            user.save()

        return instance

    def create(self, validated_data):
        # caso também use CREATE
        escritorio = super().create(validated_data)
        user = self.context['request'].user
        if not user.escritorio:
            user.escritorio = escritorio
            user.save()
        return escritorio

class EscritorioMeView(RetrieveUpdateAPIView):
    serializer_class = EscritorioSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.escritorio

    def perform_update(self, serializer):
        # Atualiza ou cria o escritório
        escritorio = serializer.save()

        # Faz o vínculo com o usuário, se ainda não existir
        user = self.request.user
        if not user.escritorio:
            user.escritorio = escritorio
            user.save()
