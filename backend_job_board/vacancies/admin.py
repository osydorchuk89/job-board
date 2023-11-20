from django.contrib import admin
from .models import Vacancy, Application


@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = ["title", "recruiter", "posting_date"]


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ["vacancy", "recruiter", "candidate", "submission_date"]
