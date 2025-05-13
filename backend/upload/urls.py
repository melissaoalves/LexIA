from django.urls import path
from .views import DocumentoUploadView

urlpatterns = [
    path('upload/', DocumentoUploadView.as_view(), name='documento-upload'),
]
