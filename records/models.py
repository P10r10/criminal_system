from django.db import models, transaction
from datetime import datetime


class Person(models.Model):
    name = models.CharField(max_length=100)
    alias = models.CharField(max_length=50, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name


class Casefile(models.Model):
    number = models.CharField(max_length=20, unique=True, blank=True)
    crime = models.CharField(max_length=50)
    status = models.CharField(max_length=20)

    def save(self, *args, **kwargs):
        with transaction.atomic():
            is_new = self.pk is None
            super().save(*args, **kwargs)  # gravar para obter a pk
            if is_new and not self.number:  # se number não existir e for pk for nova
                current_year = datetime.now().year
                self.number = f"{self.pk}/{current_year}"  # ex. 15/2026
                super().save()  # gravar outra vez para actualizar number

    def __str__(self):
        return self.number


class Personcasefile(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    casefile = models.ForeignKey(Casefile, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("person", "casefile")  # previne duplicados - 1 pessoa 1 processo apenas
