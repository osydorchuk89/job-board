from rest_framework.permissions import BasePermission, SAFE_METHODS


class EditDeleteCompanyPermission(BasePermission):
    message = "Only the company recruiter can edit or delete it."

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.recruiter.user == request.user
