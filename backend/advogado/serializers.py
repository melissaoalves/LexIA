from rest_framework import serializers
from upload.models import Advogado, Escritorio, Causa
from django.contrib.auth.hashers import make_password

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
            'id', 'nome', 'email', 'senha', 'logo', 'cnpj', 'oab',
            'telefone', 'cep', 'logradouro', 'numero', 'complemento',
            'bairro', 'cidade', 'estado', 'qtd_funcionarios', 'data_criacao'
        ]
        extra_kwargs = {
            'senha': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data['senha'] = make_password(validated_data['senha'])
        return super().create(validated_data)        
