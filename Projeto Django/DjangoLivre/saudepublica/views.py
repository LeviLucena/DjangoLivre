# Importe a biblioteca padrão
import json

# Importe bibliotecas do Django
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.db import models
from django.contrib import messages
from django.contrib.auth.hashers import check_password


# Importe bibliotecas de terceiros
import pandas as pd
import plotly.express as px
from faker import Faker

# Importe modelos, formulários e outros
from .forms import PacienteForm, RegistroMedicoForm
from .models import Hospital, Paciente, RegistroMedico
from .models import Usuario

fake = Faker()

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        try:
            usuario = Usuario.objects.get(username=username)
            if check_password(password, usuario.password):
                messages.success(request, 'Login bem-sucedido!')
                return redirect('pagina_inicial')
            else:
                messages.error(request, 'Usuário e/ou senha inválidos. Tente novamente!')
        except Usuario.DoesNotExist:
            messages.error(request, 'Usuário e/ou senha inválidos. Tente novamente!')

    return render(request, 'accounts/login.html')

# Função para gerar a página inicial
def pagina_inicial(request):
    context = {
        'total_hospitais': Hospital.objects.count(),
        'total_pacientes': Paciente.objects.count(),
        'total_registros': RegistroMedico.objects.count(),
    }
    return render(request, 'saudepublica/inicio.html', context)

# Função para gerar relatório
def mapa_leitos(request):
    if Hospital.objects.count() == 0:
        generate_fake_hospitals(num_hospitals=50)
    hospitais = Hospital.objects.all()
    return render(request, 'saudepublica/mapa_leitos.html', {'hospitais': hospitais})

# Função para gerar relatório
def dashboards(request):
    # Dados para o gráfico de pacientes
    pacientes_data = Paciente.objects.values('genero').annotate(count=models.Count('id'))
    pacientes_data = [{'genero': item['genero'], 'count': item['count']} for item in pacientes_data]

    # Dados para o gráfico de hospitais
    hospitais_data = Hospital.objects.values('nome', 'capacidade_leitos')
    hospitais_data = [{'nome': item['nome'], 'capacidade_leitos': item['capacidade_leitos']} for item in hospitais_data]

    # Dados para o gráfico de registros médicos
    registros_data = RegistroMedico.objects.values('diagnostico').annotate(count=models.Count('id'))
    registros_data = [{'diagnostico': item['diagnostico'], 'count': item['count']} for item in registros_data]

    return render(request, 'saudepublica/dashboards.html', {
        'pacientes_data': json.dumps(pacientes_data),
        'hospitais_data': json.dumps(hospitais_data),
        'registros_medicos_data': json.dumps(registros_data),
    })

# Função para gerar relatório
def relatorio(request):
    hospitais = Hospital.objects.all()  # Substitua pelo seu método de obter os hospitais
    pacientes = Paciente.objects.all()  # Substitua pelo seu método de obter os pacientes
    registros_medicos = RegistroMedico.objects.all() # Substitua pelo seu método de obter os registros
 
    # Adicione mais lógica para obter dados de pacientes e registros médicos se necessário
    context = {'hospitais': hospitais, 'pacientes': pacientes, 'registros_medicos': registros_medicos,}
    return render(request, 'saudepublica/relatorio.html', context)

# Função para adicionar paciente
def adicionar_paciente(request):
    if request.method == 'POST':
        form = PacienteForm(request.POST)
        if form.is_valid():
            # Se o formulário for válido, salve o Paciente
            form.save()

            # Redirecione para a lista de pacientes
            return redirect('lista_pacientes')
    else:
        # Se a requisição não for do tipo POST, crie uma instância do formulário em branco
        form = PacienteForm()

    # Renderize o template com o formulário
    return render(request, 'saudepublica/adicionar_paciente.html', {'form': form})

# Função para gerar relatório
def adicionar_registro_medico(request):
    if request.method == 'POST':
        form = RegistroMedicoForm(request.POST)
        if form.is_valid():
            # Se o formulário for válido, salve o Registro Médico
            form.save()

            # Redirecione para a lista de registros médicos
            return redirect('lista_registros_medicos')
    else:
        # Se a requisição não for do tipo POST, crie uma instância do formulário em branco
        form = RegistroMedicoForm()

    # Renderize o template com o formulário
    return render(request, 'saudepublica/adicionar_registro_medico.html', {'form': form})

# Função para gerar hospitais fictícios
def generate_fake_hospitals(num_hospitals=50):
    hospitals = []
    for _ in range(num_hospitals):
        hospital = Hospital(
            nome=fake.company(),
            endereco=fake.address().replace('\n', ', '),
            telefone=fake.numerify(text='(##) #####-####'),
            capacidade_leitos=fake.random_int(min=50, max=500)
        )
        hospitals.append(hospital)
    return Hospital.objects.bulk_create(hospitals)

# Função para gerar pacientes fictícios
def generate_fake_pacientes(num_pacientes=200):
    pacientes = []
    for _ in range(num_pacientes):
        paciente = Paciente(
            nome=fake.name(),
            idade=fake.random_int(min=1, max=100),
            genero=fake.random_element(elements=('Masculino', 'Feminino')),
            endereco=fake.address().replace('\n', ', '),
            telefone=fake.numerify(text='(##) #####-####'),
            historico_medico=fake.text(max_nb_chars=200)
        )
        pacientes.append(paciente)
    return Paciente.objects.bulk_create(pacientes)

# Função para gerar registros médicos fictícios
def generate_fake_registros_medicos(num_registros=150):
    pacientes = list(Paciente.objects.all())
    hospitais = list(Hospital.objects.all())
    if not pacientes or not hospitais:
        return
    registros_medicos = []
    for _ in range(num_registros):
        registro_medico = RegistroMedico(
            paciente=fake.random_element(elements=pacientes),
            hospital=fake.random_element(elements=hospitais),
            data_entrada=fake.date_this_decade(),
            sintomas=fake.sentence(),
            diagnostico=fake.sentence(),
            tratamento=fake.sentence()
        )
        registros_medicos.append(registro_medico)
    RegistroMedico.objects.bulk_create(registros_medicos)

# Sua função para listar hospitais
def lista_hospitais(request):
    # Gere dados fictícios apenas se não houver hospitais no banco de dados
    if Hospital.objects.count() == 0:
        generate_fake_hospitals(num_hospitals=50)  # Altere o número conforme necessário

    hospitais = Hospital.objects.all()
    return render(request, 'saudepublica/lista_hospitais.html', {'hospitais': hospitais})

# Sua função para listar pacientes
def lista_pacientes(request):
    # Gere dados fictícios apenas se não houver pacientes no banco de dados
    if Paciente.objects.count() == 0:
        generate_fake_pacientes(num_pacientes=100)  # Altere o número conforme necessário

    pacientes = Paciente.objects.all()
    return render(request, 'saudepublica/lista_pacientes.html', {'pacientes': pacientes})

# Sua função para listar registros médicos
def lista_registros_medicos(request):
    # Gere dados fictícios apenas se não houver registros médicos no banco de dados
    if RegistroMedico.objects.count() == 0:
        generate_fake_registros_medicos(num_registros=10)  # Altere o número conforme necessário

    registros_medicos = RegistroMedico.objects.all()
    pacientes = Paciente.objects.all()
    hospitais = Hospital.objects.all()
    return render(request, 'saudepublica/lista_registros_medicos.html', {'registros_medicos': registros_medicos, 'pacientes': pacientes, 'hospitais': hospitais})
