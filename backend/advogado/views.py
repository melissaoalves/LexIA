from rest_framework import viewsets
from upload.models import Advogado, Escritorio, Causa
from .serializers import AdvogadoSerializer, EscritorioSerializer, CausaSerializer

from django.http import HttpResponse

def home(request):
    return HttpResponse("Bem-vindo ao sistema de petições BPC-LOAS")

class AdvogadoViewSet(viewsets.ModelViewSet):
    queryset = Advogado.objects.all()
    serializer_class = AdvogadoSerializer

class EscritorioViewSet(viewsets.ModelViewSet):
    queryset = Escritorio.objects.all()
    serializer_class = EscritorioSerializer

class CausaViewSet(viewsets.ModelViewSet):
    queryset = Causa.objects.all()
    serializer_class = CausaSerializer