from rest_framework.permissions import BasePermission


class CreateCandidatePermission(BasePermission):
    def has_permission(self, request, view):
        if request.method == "POST":
            return True
        return False
