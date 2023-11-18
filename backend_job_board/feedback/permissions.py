from rest_framework.permissions import BasePermission


class PostFeedbackPermission(BasePermission):
    message = "Only the admin can view feedback."

    def has_permission(self, request, view):
        if request.method == "POST":
            return True
