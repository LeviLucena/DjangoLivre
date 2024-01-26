# utils.py
from django.contrib.auth.models import User

def create_test_users():
    # Verifica se o usuário já existe
    if not User.objects.filter(username='testuser').exists():
        User.objects.create_user('testuser', email='testuser@example.com', password='testpassword')
        print('Usuário testuser criado com sucesso.')
    else:
        print('O usuário testuser já existe.')

# Chame a função para criar usuários de teste
create_test_users()
