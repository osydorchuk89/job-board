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
    linkedIn = models.URLField(null=True, blank=True)
    logo = models.ImageField(upload_to="logos", null=True, blank=True)

    class Meta:
        verbose_name_plural = "Companies"

    def __str__(self):
        return self.name


class Recruiter(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    phone = PhoneNumberField()
    linkedIn = models.URLField(null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="company_recruiters")

    def __str__(self):
        return self.name


class Vacancy(models.Model):
    title = models.CharField(max_length=100)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="company_vacancies")
    recruiter = models.ForeignKey(Recruiter, on_delete=models.PROTECT, related_name="recruiter_vacancies")
    description = models.TextField()
    salary = models.IntegerField(null=True, blank=True)
    industry = models.CharField(max_length=100)
    employmentType = models.CharField(max_length=100, choices=EMPLOYMENT_TYPES)
    workMode = models.CharField(max_length=100, choices=WORK_MODES)
    postingDate = models.DateField(auto_now_add=True)
    slug = models.SlugField(max_length=100)

    class Meta:
        verbose_name_plural = "Vacancies"

    def __str__(self):
        return f"{self.company} - {self.title}"


def get_upload_path(instance, filename):
    return f"{instance.vacancy}/{filename}"


class Application(models.Model):
    vacancy = models.ForeignKey(Vacancy, on_delete=models.CASCADE, related_name="application_vacancy")
    applicant = models.ForeignKey(
        "candidates.Candidate", on_delete=models.CASCADE, related_name="application_candidate"
    )
    cv = models.FileField(upload_to=get_upload_path, null=True, blank=True)
    submissionDate = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.vacancy} - {self.applicant}"
