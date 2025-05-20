from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdvogadoViewSet, EscritorioMeView, EscritorioViewSet, CausaViewSet
from . import views

router = DefaultRouter()
router.register(r'advogados', AdvogadoViewSet, basename='advogado')
router.register(r'escritorios', EscritorioViewSet)
router.register(r'causas', CausaViewSet)


urlpatterns = [
    path('', views.home, name='home'),  
    path('escritorio/me/', EscritorioMeView.as_view(), name='escritorio-me'),
    path('', include(router.urls)),

]