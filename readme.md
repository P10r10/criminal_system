# Pré-requisitos:
- Ter o python instalado no SO  
- Configurar o python no PyCharm e criar um venv
- Abrir o terminal na pasta do venv(1) e instalar(2):
>cd .venv (1)  
>pip install django djangorestframework django-cors-headers (2)
## Correr o servidor django: 🐍
>python manage.py runserver  
## Noutro terminal correr o servidor react: ⚛️
>cd votacao-frontend (1)  
>npm install axios moment react-router-dom (2)  
>npm start (3)
# Configurações iniciais do django: 🐍
## Criar uma app: 💻
>python manage.py startapp APP_NAME

## Actualizar modelos: 🔄
>py manage.py makemigrations APP_NAME

## Criar as tabelas na base de dados: 𝄜
>py manage.py migrate

## happy coding 😊
