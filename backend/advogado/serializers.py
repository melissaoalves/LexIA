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
    class Meta:
        model = Escritorio
        fields = [
            'id', 'nome', 'email', 'logo', 'cnpj', 'oab',
            'telefone', 'cep', 'logradouro', 'numero', 'complemento',
            'bairro', 'cidade', 'estado', 'qtd_funcionarios', 'data_criacao'
        ]

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Vincular ao usuário autenticado se ainda não estiver vinculado
        user = self.context['request'].user
        if not user.escritorio:
            user.escritorio = instance
            user.save()

        return instance

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
