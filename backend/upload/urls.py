from django.urls import path
from .views import DocumentoUploadView, ListaPeticoesView

urlpatterns = [
    path('upload/', DocumentoUploadView.as_view(), name='documento-upload'),
    path('peticoes/', ListaPeticoesView.as_view(), name='lista-peticoes'),
]
