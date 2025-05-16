import google.generativeai as genai
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from .models import Documento
from .serializers import DocumentoSerializer
from pdf2image import convert_from_path
from PIL import Image
import io
import os

genai.configure(api_key=settings.GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-pro-latest')

TEMP_DIR = "temp_files"
os.makedirs(TEMP_DIR, exist_ok=True)

class DocumentoUploadView(APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):
        arquivos = request.FILES.getlist('documentos')
        documentos_processados = []

        for arquivo in arquivos:
            documento_obj = Documento.objects.create(nome=arquivo.name, arquivo=arquivo)
            texto_extraido = ""

            try:
                print(f"Processando arquivo: {arquivo.name}")
                if arquivo.name.lower().endswith('.pdf'):
                    temp_pdf_path = os.path.join(TEMP_DIR, arquivo.name)
                    try:
                        with open(temp_pdf_path, 'wb+') as temp_file:
                            for chunk in arquivo.chunks():
                                temp_file.write(chunk)
                        print(f"Arquivo PDF temporário (escrita) em: {temp_pdf_path}")
                        if os.path.exists(temp_pdf_path):
                            print(f"Arquivo PDF temporário existe em: {temp_pdf_path}")
                        else:
                            print(f"Arquivo PDF temporário NÃO existe em: {temp_pdf_path} após a escrita!")
                        images = convert_from_path(temp_pdf_path, dpi=300)  # Remove single_file=True
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
                    except Exception as e:
                        texto_extraido = f"Erro ao processar PDF: {e}"
                    finally:
                        if os.path.exists(temp_pdf_path):
                            os.remove(temp_pdf_path)

                elif arquivo.name.lower().endswith(('.png', '.jpg', '.jpeg')):
                    temp_image_path = os.path.join(TEMP_DIR, arquivo.name)
                    img = None  # Inicializa img fora do bloco try
                    try:
                        with open(temp_image_path, 'wb+') as temp_file:
                            for chunk in arquivo.chunks():
                                temp_file.write(chunk)
                        print(f"Arquivo de imagem temporário (escrita) em: {temp_image_path}")
                        if os.path.exists(temp_image_path):
                            print(f"Arquivo de imagem temporário existe em: {temp_image_path}")
                        else:
                            print(f"Arquivo de imagem temporário NÃO existe em: {temp_image_path} após a escrita!")
                        img = Image.open(temp_image_path)
                        prompt = "Leia o texto desta imagem."
                        response = model.generate_content([prompt, img])
                        response.resolve()
                        texto_extraido = response.text
                    except Exception as e:
                        texto_extraido = f"Erro ao processar imagem: {e}"
                    finally:
                        if img:
                            img.close()
                        if os.path.exists(temp_image_path):
                            os.remove(temp_image_path)

                else:
                    texto_extraido = "Formato de arquivo não suportado para extração com Gemini."

                documentos_processados.append({
                    'id': documento_obj.id,
                    'nome': documento_obj.nome,
                    'texto_extraido': texto_extraido
                })

            except Exception as e:
                documentos_processados.append({
                    'id': documento_obj.id,
                    'nome': documento_obj.nome,
                    'erro': str(e)
                })

        return Response(documentos_processados, status=201)