from rest_framework.permissions import BasePermission


class CreateRecruiterPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method == "POST":
            return True
        return request.user.is_superuser
