from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    ordering = ("email",)
    list_display = ("email", "first_name", "last_name", "id")
    search_fields = ("email", "first_name", "last_name")
    fieldsets = (
        (
            None,
            {
                "fields": (("email", "password", "first_name", "last_name", "groups", "is_superuser")),
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("password1", "password2", "email", "first_name", "last_name"),
            },
        ),
    )
