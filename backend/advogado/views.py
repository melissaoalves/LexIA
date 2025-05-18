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
    serializer_class = EscritorioSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        if user.escritorio:
            return user.escritorio
        raise NotFound("Usuário ainda não tem escritório vinculado.")

    def patch(self, request, *args, **kwargs):
        user = request.user
        data = request.data.copy()

        if user.escritorio:
            # Atualiza escritório existente
            serializer = self.get_serializer(user.escritorio, data=data, partial=True)
        else:
            # Cria novo escritório e vincula ao usuário
            serializer = self.get_serializer(data=data)
        
        serializer.is_valid(raise_exception=True)
        escritorio = serializer.save()

        if not user.escritorio:
            user.escritorio = escritorio
            user.save()

        return Response(self.get_serializer(user.escritorio).data)