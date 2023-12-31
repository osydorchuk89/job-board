from django.db import models
from django.utils.text import slugify

EMPLOYMENT_TYPES = [
    ("Full-Time", "Full-Time"),
    ("Part-Time", "Part-Time"),
    ("Contract", "Contract"),
    ("Freelance", "Freelance"),
]

WORK_MODES = [
    ("On-Site", "On-Site"),
    ("Remote", "Remote"),
    ("Hybrid", "Hybrid"),
    ("Flexible", "Flexible"),
]


class Vacancy(models.Model):
    title = models.CharField(max_length=100)
    recruiter = models.ForeignKey(
        "companies.Recruiter",
        on_delete=models.CASCADE,
        related_name="vacancy_recruiter",
    )
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    about_company = models.TextField()
    position_overview = models.TextField()
    responsibilities = models.TextField()
    qualifications = models.TextField()
    salary = models.IntegerField()
    industry = models.CharField(max_length=100)
    employment_type = models.CharField(max_length=100, choices=EMPLOYMENT_TYPES)
    work_mode = models.CharField(max_length=100, choices=WORK_MODES)
    posting_date = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Vacancies"

    def __str__(self):
        return self.title


def get_upload_path(instance, filename):
    return f"vacancies/{slugify(instance.vacancy)}-{instance.vacancy.id}/{filename}"


class Application(models.Model):
    vacancy = models.ForeignKey(
        Vacancy, on_delete=models.CASCADE, related_name="vacancy_applications"
    )
    recruiter = models.ForeignKey(
        "companies.Recruiter",
        on_delete=models.CASCADE,
        related_name="recruiter_applications",
    )
    candidate = models.ForeignKey(
        "candidates.Candidate",
        on_delete=models.CASCADE,
        related_name="candidate_applications",
    )
    cv = models.FileField(upload_to=get_upload_path)
    cover_letter = models.FileField(upload_to=get_upload_path, null=True, blank=True)
    submission_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.vacancy} - {self.candidate}"
