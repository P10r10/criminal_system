from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from records.models import Person, Casefile, Personcasefile, CrimeType, Status
from records.serializers import PersonSerializer, CasefileSerializer, PersoncasefileSerializer, CrimeTypeSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout


@api_view(['GET', 'POST'])
def persons(request):
    if request.method == 'GET':
        persons_list = Person.objects.all()
        serializer = PersonSerializer(persons_list, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PersonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def person(request, person_id):
    try:
        pers = Person.objects.get(pk=person_id)
    except Person.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        pers.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serializer = PersonSerializer(pers, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def casefiles(request):
    if request.method == 'GET':
        casefiles_list = Casefile.objects.all()
        serializer = CasefileSerializer(casefiles_list, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CasefileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def casefile(request, casefile_id):
    try:
        case_file = Casefile.objects.get(pk=casefile_id)
    except Casefile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        case_file.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serializer = CasefileSerializer(case_file, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)

    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def personcasefiles(request):
    if request.method == 'GET':
        links = Personcasefile.objects.all()
        serializer = PersoncasefileSerializer(links, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PersoncasefileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def personcasefile(request, personcasefile_id):
    try:
        person_casefile = Personcasefile.objects.get(pk=personcasefile_id)
    except Personcasefile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        person_casefile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Utilizador e password são obrigatórios'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({'error': 'O utilizador já existe'}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(username=username, password=password)

    return Response({'message': 'Utilizador ' + user.username + ' criado com sucesso'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)  # Criação da sessão
        return Response({'message': 'Logged in successfully'})
    else:
        return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logged out successfully'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    return Response({'username': request.user.username})


@api_view(['GET', 'POST'])
def crime_type_list(request):
    if request.method == 'GET':
        crimes = CrimeType.objects.all()
        serializer = CrimeTypeSerializer(crimes, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CasefileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)


class StatusChoicesView(APIView):
    def get(self, request):
        choices = [
            {"value": choice[0], "label": choice[1]}
            for choice in Status.choices
        ]
        return Response(choices)
