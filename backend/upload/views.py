import os
import io
import json
from pathlib import Path

from pdf2image import convert_from_path
from PIL import Image

from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Documento, Causa
from upload.models import Advogado
from .serializers import DocumentoSerializer, CausaSerializer

from ocr.services import extrair_dados_peticao
from pdf_extraction.services import gerar_peticao

import google.generativeai as genai

# Configuração do Gemini
genai.configure(api_key=settings.GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-pro-latest')

BASE_DIR = Path(__file__).resolve().parent.parent
TEMP_DIR = BASE_DIR / "temp_files"
os.makedirs(TEMP_DIR, exist_ok=True)

class DocumentoUploadView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):
        escritorio = request.user.escritorio
        if not escritorio:
            return Response(
                {"detail": "Usuário não possui escritório vinculado."},
                status=400
            )

        # IDs dos advogados selecionados (campo form-data "advogados")
        selected_adv_ids = request.data.getlist('advogados')

        arquivos = request.FILES.getlist('documentos')
        documentos_processados = []
        full_text_total = ""

        # Extrai texto de cada arquivo (PDF/Imagem)
        for arquivo in arquivos:
            texto_extraido = ""
            try:
                if arquivo.name.lower().endswith('.pdf'):
                    temp_pdf_path = TEMP_DIR / arquivo.name
                    with open(temp_pdf_path, 'wb+') as temp_file:
                        for chunk in arquivo.chunks():
                            temp_file.write(chunk)

                    images = convert_from_path(str(temp_pdf_path), dpi=300)
                    for img in images:
                        img_byte_arr = io.BytesIO()
                        img.save(img_byte_arr, format='PNG')
                        image_part = {
                            "mime_type": "image/png",
                            "data": img_byte_arr.getvalue()
                        }
                        response = model.generate_content(
                            ["Leia o texto desta imagem.", image_part]
                        )
                        response.resolve()
                        texto_extraido += response.text + "\n\n"

                    os.remove(temp_pdf_path)

                elif arquivo.name.lower().endswith(('.png', '.jpg', '.jpeg')):
                    temp_image_path = TEMP_DIR / arquivo.name
                    with open(temp_image_path, 'wb+') as temp_file:
                        for chunk in arquivo.chunks():
                            temp_file.write(chunk)

                    img = Image.open(temp_image_path)
                    response = model.generate_content(
                        ["Leia o texto desta imagem.", img]
                    )
                    response.resolve()
                    texto_extraido = response.text
                    img.close()
                    os.remove(temp_image_path)

                else:
                    texto_extraido = "Formato de arquivo não suportado."

                full_text_total += texto_extraido + "\n"

            except Exception as e:
                texto_extraido = f"Erro ao processar arquivo: {str(e)}"

            documento_obj = Documento.objects.create(
                nome=arquivo.name,
                arquivo=arquivo
            )
            documentos_processados.append({
                'id': documento_obj.id,
                'nome': documento_obj.nome,
                'texto_extraido': texto_extraido,
            })

        # Extrai dados principais via IA
        raw_dados = extrair_dados_peticao(full_text_total)
        try:
            dados_estruturados = (
                json.loads(raw_dados)
                if isinstance(raw_dados, str) else raw_dados
            )
        except Exception as e:
            print("Erro ao interpretar JSON:", e)
            dados_estruturados = {}

        # Monta contexto de advogados selecionados
        adv_objs = Advogado.objects.filter(
            id__in=selected_adv_ids,
            escritorio=escritorio
        )
        adv_context = [
            {
                'nome': adv.nome,
                'uf': adv.escritorio.estado or '',
                'oab': adv.oab
            }
            for adv in adv_objs
        ]
        dados_estruturados['advogados'] = adv_context

        # Cria a Causa e associa os documentos
        nome_cliente = dados_estruturados.get(
            "nome_autor", "Cliente Desconhecido"
        )
        peticao = Causa.objects.create(
            nome_cliente=nome_cliente,
            status="Em andamento",
            dados_extraidos=json.dumps(dados_estruturados, ensure_ascii=False),
            escritorio=escritorio
        )
        Documento.objects.filter(
            id__in=[d['id'] for d in documentos_processados]
        ).update(causa=peticao)

        # Gera o arquivo .docx usando o dict diretamente
        caminho_template = BASE_DIR / 'templates' / 'peticao_bpc_loas.docx'
        caminho_saida   = TEMP_DIR / f'peticao_{peticao.id}.docx'
        gerar_peticao(
            dados_estruturados,
            str(caminho_template),
            str(caminho_saida)
        )

        with open(caminho_saida, 'rb') as f:
            peticao.arquivo_peticao.save(
                f'peticao_{peticao.id}.docx', f
            )
            peticao.save()

        return Response({
            'peticao': {
                **CausaSerializer(
                    peticao, context={"request": request}
                ).data,
                'dados_extraidos': dados_estruturados
            },
            'documentos': documentos_processados
        }, status=201)


class ListaPeticoesView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        escritorio = request.user.escritorio
        if not escritorio:
            return Response([], status=200)

        causas = Causa.objects.filter(
            arquivo_peticao__isnull=False,
            escritorio=escritorio
        ).order_by('-data_criacao')

        data = CausaSerializer(
            causas, many=True, context={"request": request}
        ).data
        return Response(data)
