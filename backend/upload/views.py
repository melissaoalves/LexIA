from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from .models import Documento
from .serializers import DocumentoSerializer

class DocumentoUploadView(APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):
        arquivos = request.FILES.getlist('documentos')  # Aceitar múltiplos arquivos sem limite
        documentos = []

        for arquivo in arquivos:
            documento = Documento.objects.create(nome=arquivo.name, arquivo=arquivo)
            documentos.append(documento)
        
        # Serializar os documentos e retornar uma resposta
        serializer = DocumentoSerializer(documentos, many=True)
        return Response(serializer.data, status=201)
