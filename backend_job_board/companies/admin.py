from django.contrib import admin
from .models import Company, Recruiter, Vacancy, Application


class CompanyAdmin(admin.ModelAdmin):
    list_display = ["name", "country", "industry"]


class RecruiterAdmin(admin.ModelAdmin):
    list_display = ["name", "company"]


class VacancyAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title", "company")}


admin.site.register(Company, CompanyAdmin)
admin.site.register(Recruiter, RecruiterAdmin)
admin.site.register(Vacancy, VacancyAdmin)
admin.site.register(Application)
