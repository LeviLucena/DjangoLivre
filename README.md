# 🏥 Saúde Pública — Sistema de Gestão Hospitalar

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.14-blue?style=for-the-badge&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/Django-6.0-green?style=for-the-badge&logo=django&logoColor=white"/>
  <img src="https://img.shields.io/badge/Bootstrap-5.3-purple?style=for-the-badge&logo=bootstrap&logoColor=white"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Status-Ativo-brightgreen?style=for-the-badge"/>
</p>

<p align="center">
  Sistema web completo para gerenciamento de dados de saúde pública, desenvolvido com Django. Permite o controle de hospitais, pacientes e registros médicos, com visualização em mapas interativos, dashboards analíticos e relatórios exportáveis.
</p>

<p align="center">
  <i>⚠️ Os dados exibidos são fictícios, gerados automaticamente pela biblioteca <b>Faker</b> para fins de demonstração.</i>
</p>

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Modelos de Dados](#-modelos-de-dados)
- [Rotas da Aplicação](#-rotas-da-aplicação)
- [Screenshots](#-screenshots)
- [Referências](#-referências)
- [Contribuição](#-contribuição)
- [Licença](#-licença)
- [Autor](#-autor)

---

## 🌐 Visão Geral

O **Sistema de Gestão de Saúde Pública** é uma aplicação web Django que centraliza informações hospitalares em uma interface moderna e responsiva. A plataforma oferece um painel de controle completo com navegação intuitiva, contadores em tempo real, gráficos interativos e exportação de dados.

![image](https://github.com/LeviLucena/DjangoLivre/assets/34045910/3a41c484-e679-4ed3-b115-81893589a7a2)

---

## ✨ Funcionalidades

### 🏠 Página Inicial
- Hero section com contadores em tempo real (hospitais, pacientes, registros)
- Cards de acesso rápido a todos os módulos com animação hover
- Navbar responsiva com indicação de página ativa

### 🏨 Gestão de Hospitais
- Listagem completa com tabela interativa (busca, ordenação, paginação)
- Modal de detalhes com nome, endereço, telefone e capacidade de leitos
- Geração automática de dados fictícios com Faker

### 👤 Gestão de Pacientes
- Ficha completa por paciente (nome, idade, gênero, endereço, telefone, histórico)
- Cadastro de novos pacientes direto na interface via modal
- Badge visual de gênero (Masculino / Feminino)

### 📋 Registros Médicos
- Listagem de todos os registros com paciente, hospital e data
- Modal detalhado com sintomas, diagnóstico e tratamento
- Adição de novos registros com seleção de paciente e hospital existentes

### 🗺️ Mapa de Leitos
- Mapa interativo com **Leaflet.js** + OpenStreetMap
- Marcadores coloridos por capacidade de leitos (alta / média / baixa)
- Popup informativo ao clicar em cada hospital
- Legenda lateral explicativa

### 📊 Dashboards
- Gráfico de pizza: **Pacientes por Gênero**
- Gráfico de pizza: **Diagnósticos mais Frequentes**
- Gráfico de barras horizontal: **Capacidade de Leitos por Hospital** (Top 20)
- Todos os gráficos alimentados por dados reais do banco de dados via Django

### 📁 Relatório Geral
- Três tabelas completas: Pacientes, Hospitais, Registros Médicos
- Exportação para **CSV**, **Excel**, **PDF** e **Impressão**
- Busca e ordenação em cada tabela

---

## 🛠️ Tecnologias

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| Backend | Python | 3.14 |
| Framework | Django | 6.0 |
| Banco de dados | SQLite | — |
| Frontend | Bootstrap | 5.3 |
| Ícones | Font Awesome | 6.4 |
| Tabelas | DataTables | 1.13.6 |
| Gráficos | Plotly.js | 2.27 |
| Mapas | Leaflet.js | 1.9.4 |
| Dados fictícios | Faker | — |
| Análise de dados | Pandas | — |

---

## 📁 Estrutura do Projeto

```
DjangoLivre/
└── Projeto Django/
    └── DjangoLivre/
        ├── DjangoLivre/           # Configurações do projeto
        │   ├── settings.py
        │   ├── urls.py
        │   ├── wsgi.py
        │   └── asgi.py
        ├── saudepublica/          # App principal
        │   ├── templates/
        │   │   └── saudepublica/
        │   │       ├── base.html              # Template base (navbar + footer)
        │   │       ├── inicio.html            # Página inicial com hero
        │   │       ├── lista_hospitais.html
        │   │       ├── lista_pacientes.html
        │   │       ├── lista_registros_medicos.html
        │   │       ├── mapa_leitos.html
        │   │       ├── dashboards.html
        │   │       └── relatorio.html
        │   ├── static/
        │   │   └── saudepublica/
        │   │       ├── logo.png
        │   │       └── rodape.png
        │   ├── models.py          # Hospital, Paciente, RegistroMedico, Usuario
        │   ├── views.py           # Lógica de todas as páginas
        │   ├── urls.py            # Rotas da app
        │   ├── forms.py           # Formulários Django
        │   └── utils.py           # Utilitários (criação de usuários de teste)
        ├── accounts/              # App de autenticação
        │   ├── templates/
        │   │   └── accounts/
        │   │       └── login.html
        │   └── urls.py
        └── manage.py
```

---

## 🚀 Instalação

### Pré-requisitos
- Python 3.11 ou superior
- pip

### Passo a passo

**1. Clone o repositório**
```bash
git clone https://github.com/LeviLucena/DjangoLivre.git
cd DjangoLivre/Projeto\ Django/DjangoLivre
```

**2. Instale as dependências**
```bash
pip install django faker pandas plotly
```

**3. Execute as migrações**
```bash
python manage.py migrate
```

**4. Crie o primeiro usuário**
```bash
python -c "
import django, os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'DjangoLivre.settings')
django.setup()
from saudepublica.models import Usuario
u = Usuario(username='admin', password='admin123')
u.save()
print('Usuário criado!')
"
```

**5. Inicie o servidor**
```bash
python manage.py runserver
```

**6. Acesse no navegador**
```
http://127.0.0.1:8000/saudepublica/login/
```

> **Login:** `admin` | **Senha:** `admin123`

---

## 💡 Como Usar

1. Acesse `/saudepublica/login/` e faça login
2. Na **Página Inicial**, veja os contadores e acesse qualquer módulo
3. Em **Hospitais** e **Pacientes**, os dados fictícios são gerados automaticamente na primeira visita
4. Use o botão **"Novo Paciente"** ou **"Novo Registro"** para adicionar entradas reais
5. Explore o **Mapa de Leitos** para visualização geográfica
6. Acesse **Dashboards** para gráficos analíticos em tempo real
7. No **Relatório**, exporte os dados para CSV, Excel ou PDF

---

## 🗄️ Modelos de Dados

```python
class Hospital(models.Model):
    nome              # CharField
    endereco          # CharField
    telefone          # CharField
    capacidade_leitos # IntegerField

class Paciente(models.Model):
    nome              # CharField
    idade             # IntegerField
    genero            # CharField (Masculino / Feminino)
    endereco          # CharField
    telefone          # CharField
    historico_medico  # TextField (opcional)

class RegistroMedico(models.Model):
    paciente          # ForeignKey → Paciente
    hospital          # ForeignKey → Hospital
    data_entrada      # DateField
    sintomas          # TextField
    diagnostico       # TextField
    tratamento        # TextField

class Usuario(models.Model):
    username          # CharField
    password          # CharField (armazenado com hash make_password)
```

---

## 🔗 Rotas da Aplicação

| Método | URL | Descrição |
|--------|-----|-----------|
| GET/POST | `/saudepublica/login/` | Tela de login |
| GET | `/saudepublica/inicio/` | Página inicial |
| GET | `/saudepublica/hospitais/` | Lista de hospitais |
| GET | `/saudepublica/pacientes/` | Lista de pacientes |
| POST | `/saudepublica/adicionar_paciente/` | Cadastrar paciente |
| GET | `/saudepublica/registros/` | Lista de registros médicos |
| POST | `/saudepublica/adicionar_registro_medico/` | Cadastrar registro |
| GET | `/saudepublica/mapa_leitos/` | Mapa interativo |
| GET | `/saudepublica/dashboards/` | Gráficos analíticos |
| GET | `/saudepublica/relatorio/` | Relatório com exportação |

---

## 📸 Screenshots

| Imagem 1 | Imagem 2 | Imagem 3 |
|----------|----------|----------|
| ![image](https://github.com/LeviLucena/DjangoLivre/assets/34045910/c25d3769-5886-495a-9a40-6ea5aa082b0d) | ![image](https://github.com/LeviLucena/DjangoLivre/assets/34045910/e26a21e3-6cdc-4dfa-8bfa-9de824c3f482) | ![image](https://github.com/LeviLucena/DjangoLivre/assets/34045910/0b95b00f-350d-4960-9b3b-58b3cd29aa61) |

| Imagem 4 | Imagem 5 | Imagem 6 |
|----------|----------|----------|
| ![image](https://github.com/LeviLucena/DjangoLivre/assets/34045910/94c7cbfa-38cc-43b8-bfe9-0805893fbe61) | ![image](https://github.com/LeviLucena/DjangoLivre/assets/34045910/e98594b0-cb5f-4f69-935b-c71cb15fc9fd) | ![image](https://github.com/LeviLucena/DjangoLivre/assets/34045910/1a519838-9f15-434c-a5d4-25225e90c925) |

| Imagem 7 | Imagem 8 | Imagem 9 |
|----------|----------|----------|
| ![image](https://github.com/LeviLucena/DjangoLivre/assets/34045910/72a015b9-3f96-472b-aebf-e2f27ed241f5) | ![image](https://github.com/LeviLucena/DjangoLivre/assets/34045910/29cae4f8-7cf1-4679-bdfa-695bef14e140) | ![image](https://github.com/LeviLucena/DjangoLivre/assets/34045910/d5a51242-f33f-43c1-bc2c-03c7a991931d) |

| Imagem 10 | Imagem 11 | Imagem 12 |
|-----------|-----------|-----------|
| ![image](https://github.com/LeviLucena/DjangoLivre/assets/34045910/595aeb57-809e-4e13-a980-c3588b098b81) | ![image](https://github.com/LeviLucena/DjangoLivre/assets/34045910/cf355545-7825-437d-b943-d56b8d2edb2f) | ![image](https://github.com/LeviLucena/DjangoLivre/assets/34045910/1a7483e7-7767-44f8-acd4-91c55e4a0df6) |

---

## 📚 Referências

- [Django Documentation](https://docs.djangoproject.com/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/)
- [DataTables Documentation](https://datatables.net/)
- [Font Awesome Icons](https://fontawesome.com/)
- [Plotly.js Documentation](https://plotly.com/javascript/)
- [Leaflet.js Documentation](https://leafletjs.com/)
- [Faker Documentation](https://faker.readthedocs.io/)

---

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um **fork** do repositório
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Commit suas mudanças: `git commit -m 'feat: adiciona minha feature'`
4. Push para a branch: `git push origin feature/minha-feature`
5. Abra um **Pull Request**

---

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE). Consulte o arquivo `LICENSE` para mais detalhes.

---

## 👨‍💻 Autor

<p>
  <a href="https://www.linkedin.com/in/levilucena/">
    <img src="https://img.shields.io/badge/-LinkedIn-blue?style=for-the-badge&logo=Linkedin&logoColor=white"/>
  </a>
  &nbsp;
  <a href="https://github.com/LeviLucena">
    <img src="https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
</p>

Desenvolvido por **Levi Lucena** — sinta-se à vontade para entrar em contato!

---

<p align="center">
  Feito com ❤️ e Django
</p>
