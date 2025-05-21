import re
from rest_framework import serializers
from upload.models import Advogado, Escritorio, Causa
from django.contrib.auth.hashers import make_password
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from django.core.files.base import ContentFile
from io import BytesIO
from PIL import Image

class AdvogadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advogado
        fields = ['id', 'nome', 'email', 'oab', 'data_admissao', 'escritorio']

class CausaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Causa
        fields = ['id', 'nome_cliente', 'data_criacao', 'status', 'advogados']

class EscritorioSerializer(serializers.ModelSerializer):
    cep = serializers.CharField(max_length=10, allow_blank=True, allow_null=True)

    class Meta:
        model = Escritorio
        fields = [
            'id', 'nome', 'email', 'logo', 'cnpj', 'oab',
            'telefone', 'cep', 'logradouro', 'numero', 'complemento',
            'bairro', 'cidade', 'estado', 'qtd_funcionarios', 'data_criacao'
        ]

    def validate_cep(self, value):
        if value in (None, ''):
            return value
        clean = re.sub(r'\D', '', value)
        if len(clean) != 8:
            raise serializers.ValidationError("CEP deve conter exatamente 8 dígitos numéricos.")
        return clean

    def resize_logo(self, logo_file):
        try:
            img = Image.open(logo_file)
            img = img.convert("RGB")
            img = img.resize((472, 472))  # ~4x4cm em 300dpi
            buffer = BytesIO()
            img.save(buffer, format='PNG', quality=90)
            buffer.seek(0)
            return ContentFile(buffer.read(), name=logo_file.name)
        except Exception as e:
            raise serializers.ValidationError(f"Erro ao redimensionar logo: {e}")

    def update(self, instance, validated_data):
        logo = validated_data.get("logo")
        if logo:
            validated_data["logo"] = self.resize_logo(logo)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        user = self.context['request'].user
        if not user.escritorio:
            user.escritorio = instance
            user.save()

        return instance

    def create(self, validated_data):
        logo = validated_data.get("logo")
        if logo:
            validated_data["logo"] = self.resize_logo(logo)

        escritorio = super().create(validated_data)
        user = self.context['request'].user
        if not user.escritorio:
            user.escritorio = escritorio
            user.save()

        return escritorio
