from rest_framework import serializers
from .models import Documento, Causa, Escritorio

class DocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Documento
        fields = ['id', 'nome', 'arquivo', 'data_upload', 'causa', 'texto_extraido']

class CausaSerializer(serializers.ModelSerializer):
    documentos = DocumentoSerializer(many=True, read_only=True)
    arquivo_peticao_url = serializers.SerializerMethodField()

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
            'arquivo_peticao_url',  # novo campo com URL completa
            'documentos'
        ]

    def get_arquivo_peticao_url(self, obj):
        request = self.context.get('request')
        if obj.arquivo_peticao and hasattr(obj.arquivo_peticao, 'url'):
            return request.build_absolute_uri(obj.arquivo_peticao.url)
        return None
