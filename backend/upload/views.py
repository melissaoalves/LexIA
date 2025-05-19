import os
import io
import json
from pdf2image import convert_from_path
from PIL import Image
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
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
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):
        arquivos = request.FILES.getlist('documentos')
        documentos_processados = []
        full_text_total = ""

        for arquivo in arquivos:
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
                        image_part = {"mime_type": "image/png", "data": img_byte_arr.getvalue()}
                        response = model.generate_content(["Leia o texto desta imagem.", image_part])
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
                    response = model.generate_content(["Leia o texto desta imagem.", img])
                    response.resolve()
                    texto_extraido = response.text
                    img.close()
                    os.remove(temp_image_path)

                else:
                    texto_extraido = "Formato de arquivo não suportado."

                full_text_total += texto_extraido + "\n"

            except Exception as e:
                texto_extraido = f"Erro ao processar arquivo: {str(e)}"

            documento_obj = Documento.objects.create(nome=arquivo.name, arquivo=arquivo)
            documentos_processados.append({
                'id': documento_obj.id,
                'nome': documento_obj.nome,
                'texto_extraido': texto_extraido,
            })

        raw_dados = extrair_dados_peticao(full_text_total)

        try:
            dados_estruturados = json.loads(raw_dados) if isinstance(raw_dados, str) else raw_dados
        except Exception as e:
            print("Erro ao interpretar JSON:", e)
            dados_estruturados = {}
        except Exception as e:
            print("Erro na extração de dados:", e)
            dados_estruturados = {}

        nome_cliente = dados_estruturados.get("nome_autor", "Cliente Desconhecido")
        peticao = Causa.objects.create(
            nome_cliente=nome_cliente,
            status="Em andamento",
            dados_extraidos=json.dumps(dados_estruturados, ensure_ascii=False)
        )

        # Associa os documentos à petição
        for doc in Documento.objects.filter(id__in=[d['id'] for d in documentos_processados]):
            doc.causa = peticao
            doc.save()

        # 🔧 Geração da petição
        caminho_template = os.path.join('templates', 'peticao_bpc_loas.docx')
        caminho_saida = os.path.join(TEMP_DIR, f'peticao_{peticao.id}.docx')
        gerar_peticao(json.dumps(dados_estruturados, ensure_ascii=False), caminho_template, caminho_saida)


        with open(caminho_saida, 'rb') as f:
            peticao.arquivo_peticao.save(f'peticao_{peticao.id}.docx', f)
            peticao.save()

        return Response({
            'peticao': {
                **CausaSerializer(peticao, context={"request": request}).data,
                'dados_extraidos': dados_estruturados
            },
            'documentos': documentos_processados
        }, status=201)


class ListaPeticoesView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        causas = Causa.objects.filter(arquivo_peticao__isnull=False).order_by('-data_criacao')
        data = CausaSerializer(causas, many=True, context={"request": request}).data
        return Response(data)
