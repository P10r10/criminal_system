from rest_framework import serializers
from .models import Person, Casefile, Personcasefile, CrimeType


class PersonSerializer(serializers.ModelSerializer):
    date_of_birth = serializers.DateField(required=False, allow_null=True)

    class Meta:
        model = Person
        fields = ('id', 'name', 'alias', 'date_of_birth')


class CasefileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Casefile
        fields = ['id', 'year', 'crime', 'status']
        read_only_fields = ('id', 'year')


class PersoncasefileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personcasefile
        fields = ['id', 'person', 'casefile']


class CrimeTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrimeType
        fields = ['id', 'value', 'label']
