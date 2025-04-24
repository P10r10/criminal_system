from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from records.models import Person, Casefile
from records.serializers import PersonSerializer, CasefileSerializer


# Create your views here.

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
