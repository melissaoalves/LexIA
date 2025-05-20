from rest_framework import viewsets, generics, permissions
from upload.models import Advogado, Escritorio, Causa
from .serializers import AdvogadoSerializer, EscritorioSerializer, CausaSerializer
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from upload.models import Escritorio
from advogado.serializers import EscritorioSerializer
from django.http import Http404, HttpResponse
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.parsers import FormParser, MultiPartParser


def home(request):
    return HttpResponse("Bem-vindo ao sistema de petições BPC-LOAS")

class AdvogadoViewSet(viewsets.ModelViewSet):
    serializer_class = AdvogadoSerializer
    permission_classes = [IsAuthenticated]
    queryset = Advogado.objects.none()  # Adicione isso

    def get_queryset(self):
        user = self.request.user
        if user.escritorio:
            return Advogado.objects.filter(escritorio=user.escritorio)
        return Advogado.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if user.escritorio:
            serializer.save(escritorio=user.escritorio)
        else:
            raise serializers.ValidationError("Usuário não possui escritório vinculado.")

class EscritorioViewSet(viewsets.ModelViewSet):
    queryset = Escritorio.objects.all()
    serializer_class = EscritorioSerializer

class CausaViewSet(viewsets.ModelViewSet):
    queryset = Causa.objects.all()
    serializer_class = CausaSerializer

class EscritorioUpdateView(generics.UpdateAPIView):
    serializer_class = EscritorioSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        return user.escritorio

    def perform_update(self, serializer):
        escritorio = serializer.save()
        user = self.request.user
        if user.escritorio is None:
            user.escritorio = escritorio
            user.save()
    
class EscritorioMeView(RetrieveUpdateAPIView):
    """
    GET: retorna os dados do escritório vinculado ao usuário.
    PATCH: atualiza campos do escritório e permite upload de logo.
    """
    serializer_class = EscritorioSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [FormParser, MultiPartParser]

    def get_object(self):
        user = self.request.user
        if user.escritorio:
            return user.escritorio
        raise NotFound("Usuário ainda não tem escritório vinculado.")

    # removido o método patch personalizado para usar o comportamento padrão de update
    # que já lida com request.data (incluindo arquivos) via DRF

    def perform_update(self, serializer):
        escritorio = serializer.save()
        user = self.request.user
        if not user.escritorio:
            user.escritorio = escritorio
            user.save()
