# accounts/urls.py

from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    # ... outras URLs ...
    path('login/', auth_views.LoginView.as_view(), name='login'),
    # Certifique-se de que você tem a URL de logout, caso contrário, adicione-a
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    # ... outras URLs ...
]
