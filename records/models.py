from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=100)
    alias = models.CharField(max_length=50, null=True, blank=True)
    date_of_birth = models.DateField()

class Casefile(models.Model):
    number = models.CharField(max_length=50)
    crime = models.CharField(max_length=50)
    status = models.CharField(max_length=20)