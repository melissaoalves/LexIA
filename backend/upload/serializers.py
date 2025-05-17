from rest_framework import serializers
from .models import Documento, Causa, Escritorio

class DocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Documento
        fields = ['id', 'nome', 'arquivo', 'data_upload', 'causa', 'texto_extraido']

class CausaSerializer(serializers.ModelSerializer):
    documentos = DocumentoSerializer(many=True, read_only=True)

    class Meta:
        model = Causa
        fields = [
            'id',
            'nome_cliente',
            'data_criacao',
            'status',
            'advogados',
            'dados_extraidos',
            'arquivo_peticao',
            'documentos'
        ]
