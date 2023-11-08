from django.contrib import admin
from .models import Company, Recruiter


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ["name", "industry"]


@admin.register(Recruiter)
class RecruiterAdmin(admin.ModelAdmin):
    list_display = ["first_name", "last_name"]
