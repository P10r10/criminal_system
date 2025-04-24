from rest_framework import serializers
from .models import Person, Casefile


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('name', 'alias', 'date_of_birth')

class CasefileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Casefile
        fields = ['id', 'number', 'crime', 'status']
