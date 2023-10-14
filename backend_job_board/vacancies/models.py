from django.db import models

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


class Vacancy(models.Model):
    title = models.CharField(max_length=100)
    company = models.ForeignKey("companies.Company", on_delete=models.CASCADE, related_name="vacancy_company")
    recruiter = models.ForeignKey("companies.Recruiter", on_delete=models.PROTECT, related_name="vacancy_recruiter")
    city = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField()
    salary = models.IntegerField(null=True, blank=True)
    industry = models.CharField(max_length=100)
    employment_type = models.CharField(max_length=100, choices=EMPLOYMENT_TYPES)
    work_mode = models.CharField(max_length=100, choices=WORK_MODES)
    posting_date = models.DateField(auto_now_add=True)
    slug = models.SlugField(max_length=100)

    class Meta:
        verbose_name_plural = "Vacancies"

    def __str__(self):
        return f"{self.company} - {self.title}"


def get_upload_path(instance, filename):
    return f"vacancies/{instance.vacancy}/{filename}"


class Application(models.Model):
    vacancy = models.ForeignKey(Vacancy, on_delete=models.CASCADE, related_name="application_vacancy")
    applicant = models.ForeignKey(
        "candidates.Candidate", on_delete=models.CASCADE, related_name="application_candidate"
    )
    cv = models.FileField(upload_to=get_upload_path, null=True, blank=True)
    submission_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.vacancy} - {self.applicant}"
