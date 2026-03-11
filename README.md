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

## 🌐 Visão Geral

O **Sistema de Gestão de Saúde Pública** é uma aplicação web Django que centraliza informações hospitalares em uma interface moderna e responsiva. A plataforma oferece um painel de controle completo com navegação intuitiva, contadores em tempo real, gráficos interativos e exportação de dados.

<img width="1339" height="913" alt="image" src="https://github.com/user-attachments/assets/3982b650-a371-49b4-bff0-f6108be8ea32" />

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
| ![image](https://github.com/user-attachments/assets/970431dc-1a97-4f90-a294-723a42818427) | ![image](https://github.com/user-attachments/assets/879c8520-e371-400e-ac6f-b7bd0dced6bd) | ![image](https://github.com/user-attachments/assets/7a6e50cf-ec0d-4ab0-b74f-7340f233264d) |

| Imagem 4 | Imagem 5 | Imagem 6 |
|----------|----------|----------|
| ![image](https://github.com/user-attachments/assets/4cbc78be-7f2f-4b29-8395-190fad64535c) | ![image](https://github.com/user-attachments/assets/5174f2bf-f495-4d60-b0c7-b62ee0047b14) | ![image](https://github.com/user-attachments/assets/470325ab-e7c4-4084-bdb8-c5121e05f0a5) |

| Imagem 7 | Imagem 8 | Imagem 9 |
|----------|----------|----------|
| ![image](https://github.com/user-attachments/assets/e49bc254-8013-4960-b2a1-b77318b055f0) | ![image](https://github.com/user-attachments/assets/6e585168-226e-43fc-852f-e37f8f7324aa) | ![image](https://github.com/user-attachments/assets/ca58485a-d0cd-4953-8b1c-d9e5357b90f7) |

| Imagem 10 | Imagem 11 | Imagem 12 |
|-----------|-----------|-----------|
| ![image](https://github.com/user-attachments/assets/e7abccee-52d7-44e8-b154-05c99f17f7dd) | ![image](https://github.com/user-attachments/assets/8db72ca8-fa21-41b6-bca8-5f07aae5246b) | ![image](https://github.com/user-attachments/assets/5e9833bc-7592-4ffd-a684-c00261960c13) |

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
