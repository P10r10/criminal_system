from django.db import models

# Create your models here.

class Person(models.Model):
    name = models.CharField(max_length=100)
    alias = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    #TODO add fields
