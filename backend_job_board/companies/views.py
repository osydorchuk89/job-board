from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .models import Recruiter
from .serializers import RecruiterSerializer
from .permissions import CreateRecruiterPermission


class RecruiterViewSet(viewsets.ModelViewSet, CreateRecruiterPermission):
    serializer_class = RecruiterSerializer
    queryset = (
        Recruiter.objects.select_related("user").prefetch_related("recruiter_applications").all()
    )
    permission_classes = [CreateRecruiterPermission]

    @action(detail=False, methods=["GET", "PUT"], permission_classes=[IsAuthenticated])
    def me(self, request):
        (candidate, created) = Recruiter.objects.get_or_create(user_id=request.user.id)
        if request.method == "GET":
            serializer = RecruiterSerializer(candidate)
            return Response(serializer.data)
        elif request.method == "PUT":
            serializer = RecruiterSerializer(candidate, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
