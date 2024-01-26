from django.shortcuts import render

def login_view(request):
    # Lógica de login aqui, se necessário
    return render(request, 'accounts/login.html')
