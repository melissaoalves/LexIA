# upload/views.py

import os
import io
import json
from pdf2image import convert_from_path
from PIL import Image
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from .models import Documento, Causa
from .serializers import DocumentoSerializer, CausaSerializer
from ocr.services import extrair_dados_peticao
from pdf_extraction.services import gerar_peticao
from pathlib import Path
import google.generativeai as genai
genai.configure(api_key=settings.GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-pro-latest')

BASE_DIR = Path(__file__).resolve().parent.parent
TEMP_DIR = "temp_files"
os.makedirs(TEMP_DIR, exist_ok=True)

class DocumentoUploadView(APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):
        peticao_id = request.data.get('peticao_id')
        if peticao_id:
            peticao = Causa.objects.get(id=peticao_id)
        else:
            peticao = Causa.objects.create(nome_cliente="Cliente Exemplo", status="Em andamento")

        arquivos = request.FILES.getlist('documentos')
        documentos_processados = []

        full_text_total = ""

        for arquivo in arquivos:
            documento_obj = Documento.objects.create(nome=arquivo.name, arquivo=arquivo, causa=peticao)

            texto_extraido = ""

            try:
                if arquivo.name.lower().endswith('.pdf'):
                    temp_pdf_path = os.path.join(TEMP_DIR, arquivo.name)
                    with open(temp_pdf_path, 'wb+') as temp_file:
                        for chunk in arquivo.chunks():
                            temp_file.write(chunk)

                    images = convert_from_path(temp_pdf_path, dpi=300)
                    full_text = ""
                    for img in images:
                        img_byte_arr = io.BytesIO()
                        img.save(img_byte_arr, format='PNG')
                        img_byte_arr = img_byte_arr.getvalue()
                        image_part = {"mime_type": "image/png", "data": img_byte_arr}
                        prompt = "Leia o texto desta imagem."
                        response = model.generate_content([prompt, image_part])
                        response.resolve()
                        full_text += response.text + "\n\n"
                    texto_extraido = full_text

                    os.remove(temp_pdf_path)

                elif arquivo.name.lower().endswith(('.png', '.jpg', '.jpeg')):
                    temp_image_path = os.path.join(TEMP_DIR, arquivo.name)
                    with open(temp_image_path, 'wb+') as temp_file:
                        for chunk in arquivo.chunks():
                            temp_file.write(chunk)

                    img = Image.open(temp_image_path)
                    prompt = "Leia o texto desta imagem."
                    response = model.generate_content([prompt, img])
                    response.resolve()
                    texto_extraido = response.text

                    img.close()
                    os.remove(temp_image_path)

                else:
                    texto_extraido = "Formato de arquivo não suportado."

                documento_obj.texto_extraido = texto_extraido
                documento_obj.save()

                full_text_total += texto_extraido + "\n"

            except Exception as e:
                texto_extraido = f"Erro ao processar arquivo: {str(e)}"

            documentos_processados.append({
                'id': documento_obj.id,
                'nome': documento_obj.nome,
                'texto_extraido': texto_extraido,
            })

        dados_estruturados_json = extrair_dados_peticao(full_text_total)

        caminho_template = os.path.join('templates', 'peticao_bpc_loas.docx')

        caminho_saida = os.path.join(TEMP_DIR, f'peticao_{peticao.id}.docx')

        gerar_peticao(dados_estruturados_json, caminho_template, caminho_saida)

        with open(caminho_saida, 'rb') as f:
            peticao.arquivo_peticao.save(f'peticao_{peticao.id}.docx', f)
            peticao.save()


        return Response({
            'peticao': CausaSerializer(peticao).data,
            'documentos': documentos_processados
        }, status=201)
