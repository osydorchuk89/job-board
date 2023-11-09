from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from .models import Candidate
from .serializers import CandidateSerializer


class CandidateViewSet(viewsets.ModelViewSet):
    serializer_class = CandidateSerializer
    queryset = Candidate.objects.all()

    def get_permissions(self):
        if self.request.method == "GET":
            return [IsAdminUser()]
        elif self.request.method == "POST":
            return [AllowAny()]
        return [permission() for permission in self.permission_classes]

    @action(detail=False, methods=["GET", "PUT"], permission_classes=[IsAuthenticated])
    def me(self, request):
        (candidate, created) = Candidate.objects.get_or_create(user_id=request.user.id)
        if request.method == "GET":
            serializer = CandidateSerializer(candidate)
            return Response(serializer.data)
        elif request.method == "PUT":
            serializer = CandidateSerializer(candidate, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
