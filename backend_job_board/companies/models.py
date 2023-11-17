from django.db import models
from django.conf import settings


class Recruiter(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="recruiter_user")
    company = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    country = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

    def first_name(self):
        return self.user.first_name

    def last_name(self):
        return self.user.last_name


# class Company(models.Model):
#     name = models.CharField(max_length=100)
#     recruiter = models.OneToOneField(Recruiter, on_delete=models.CASCADE, related_name="company_recruiter")
#     industry = models.CharField(max_length=100)

#     class Meta:
#         verbose_name_plural = "Companies"

#     def __str__(self):
#         return self.name
