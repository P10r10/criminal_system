from django.db import models
from datetime import datetime


class Person(models.Model):
    name = models.CharField(max_length=100)
    alias = models.CharField(max_length=50, null=True, blank=True)
    date_of_birth = models.DateField()

    def __str__(self):
        return self.name


class Casefile(models.Model):
    number = models.CharField(max_length=20, unique=True, blank=True)
    crime = models.CharField(max_length=50)
    status = models.CharField(max_length=20)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # gravar para obter a pk
        if not self.number:  # se number não existir, criar como <pk>/<current-year>
            current_year = datetime.now().year
            self.number = f"{self.pk}/{current_year}"
            super().save(update_fields=["number"]) # gravar outra vez para actualizar number

    def __str__(self):
        return self.number
