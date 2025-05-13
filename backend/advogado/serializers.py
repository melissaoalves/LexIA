from rest_framework import serializers
from upload.models import Advogado, Escritorio, Causa

class AdvogadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advogado
        fields = ['id', 'nome', 'email', 'oab', 'data_admissao', 'escritorio']

class EscritorioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escritorio
        fields = ['id', 'nome', 'email', 'senha', 'data_criacao']

class CausaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Causa
        fields = ['id', 'nome_cliente', 'data_criacao', 'status', 'advogados']
