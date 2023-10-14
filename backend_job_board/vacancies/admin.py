from django.contrib import admin
from .models import Vacancy, Application


class VacancyAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title", "company")}


admin.site.register(Vacancy, VacancyAdmin)
admin.site.register(Application)
