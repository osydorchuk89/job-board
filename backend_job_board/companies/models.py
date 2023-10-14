from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

EMPLOYMENT_TYPES = [
    ("Full Time", "Full Time"),
    ("Part Time", "Part Time"),
    ("Contract", "Contract"),
    ("Temporary", "Temporary"),
    ("Freelance", "Freelance"),
    ("Internship", "Internship"),
]

WORK_MODES = [
    ("On-site", "On-site"),
    ("Remote", "Remote"),
    ("Hybrid", "Hybrid"),
    ("Flexible", "Flexible"),
]


class Company(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    industry = models.CharField(max_length=100)
    linkedin = models.URLField(null=True, blank=True)
    logo = models.ImageField(upload_to="companies/logos", null=True, blank=True)

    class Meta:
        verbose_name_plural = "Companies"

    def __str__(self):
        return self.name


class Recruiter(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    phone = PhoneNumberField()
    linkedin = models.URLField(null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="company_recruiters")

    def __str__(self):
        return self.name
