from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Candidate
from .serializers import CandidateSerializer


class CandidateViewSet(viewsets.ModelViewSet):
    serializer_class = CandidateSerializer
    queryset = Candidate.objects.all()
