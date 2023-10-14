from django.contrib import admin
from .models import Company, Recruiter


class CompanyAdmin(admin.ModelAdmin):
    list_display = ["name", "country", "industry"]


class RecruiterAdmin(admin.ModelAdmin):
    list_display = ["name", "company"]


admin.site.register(Company, CompanyAdmin)
admin.site.register(Recruiter, RecruiterAdmin)
