from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdvogadoViewSet, EscritorioViewSet, CausaViewSet
from . import views

router = DefaultRouter()
router.register(r'advogados', AdvogadoViewSet)
router.register(r'escritorios', EscritorioViewSet)
router.register(r'causas', CausaViewSet)

urlpatterns = [
    path('', views.home, name='home'),  # Página inicial
    path('api/', include(router.urls)),
]