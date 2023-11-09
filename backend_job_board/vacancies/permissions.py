from rest_framework.permissions import BasePermission, SAFE_METHODS


class EditDeleteVacancyPermission(BasePermission):
    message = "Only the recruiter who created a vacancy can edit and/or delete it."

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.recruiter.user == request.user


class ViewApplicationPermission(BasePermission):
    message = "Only the candidate who created an application can view it."

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return obj.candidate.user == request.user
        return False
