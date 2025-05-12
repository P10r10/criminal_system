from django.db import models
from datetime import datetime


class Person(models.Model):
    name = models.CharField(max_length=100)
    alias = models.CharField(max_length=50, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name


class Status(models.TextChoices):
    PENDENTE = 'pendente', 'Pendente'
    ARQUIVADO = 'arquivado', 'Arquivado'
    ACUSADO = 'acusado', 'Acusado'


class CrimeType(models.Model):
    value = models.CharField(max_length=50, unique=True)
    label = models.CharField(max_length=50)

    def __str__(self):
        return self.label


class Casefile(models.Model):
    year = models.IntegerField(default=datetime.today().year)
    crime = models.CharField(max_length=50)
    crime_date = models.DateField()
    description = models.TextField(max_length=200, null=True, blank=True)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDENTE)

    def __str__(self):
        return f"{self.id}/{self.year}"


class Personcasefile(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    casefile = models.ForeignKey(Casefile, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("person", "casefile")  # previne duplicados - 1 pessoa 1 processo apenas
