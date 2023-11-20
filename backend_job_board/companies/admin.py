from django.contrib import admin
from .models import Recruiter


@admin.register(Recruiter)
class RecruiterAdmin(admin.ModelAdmin):
    list_display = ["first_name", "last_name", "id"]
