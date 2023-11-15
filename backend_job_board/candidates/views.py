from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Candidate
from .serializers import CandidateSerializer
from .permissions import CreateCandidatePermission


class CandidateViewSet(viewsets.ModelViewSet, CreateCandidatePermission):
    serializer_class = CandidateSerializer
    queryset = Candidate.objects.all()
    permission_classes = [CreateCandidatePermission]

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
