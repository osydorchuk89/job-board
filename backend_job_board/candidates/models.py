from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class Candidate(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    phone = PhoneNumberField()
    linkedIn = models.URLField(null=True, blank=True)
    cv = models.FileField(upload_to="candidates/cvs", null=True, blank=True)

    def __str__(self):
        return self.name
