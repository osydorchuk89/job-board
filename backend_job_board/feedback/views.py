from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .models import Feedback
from .serializers import FeedbackSerializer
from .permissions import PostFeedbackPermission


class FeedbackViewSet(viewsets.ModelViewSet, PostFeedbackPermission):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [PostFeedbackPermission]
