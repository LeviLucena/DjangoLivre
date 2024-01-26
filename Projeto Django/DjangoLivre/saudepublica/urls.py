from django.urls import path
from .views import pagina_inicial, lista_hospitais, lista_pacientes, adicionar_paciente, lista_registros_medicos, adicionar_registro_medico, mapa_leitos, dashboards, relatorio, login_view

urlpatterns = [
    path('inicio/', pagina_inicial, name='pagina_inicial'),
    path('hospitais/', lista_hospitais, name='lista_hospitais'),
    path('pacientes/', lista_pacientes, name='lista_pacientes'),
    path('adicionar_paciente/', adicionar_paciente, name='adicionar_paciente'),
    path('registros/', lista_registros_medicos, name='lista_registros_medicos'),
    path('adicionar_registro_medico/', adicionar_registro_medico, name='adicionar_registro_medico'),
    path('mapa_leitos/', mapa_leitos, name='mapa_leitos'),
    path('dashboards/', dashboards, name='dashboards'),
    path('relatorio/', relatorio, name='relatorio'),
    path('login/', login_view, name='login'),
]

