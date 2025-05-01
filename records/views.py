from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from records.models import Person, Casefile, Personcasefile
from records.serializers import PersonSerializer, CasefileSerializer, PersoncasefileSerializer
from django.contrib.auth.models import User


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
    if username is None or password is None:
        return Response({'error': 'invalid username/password'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User ' + user.username + ' created successfully'}, status=status.HTTP_201_CREATED)
