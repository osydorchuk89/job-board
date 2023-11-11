from rest_framework import serializers
from .models import Candidate
from vacancies.serializers import ApplicationSerializer


class CandidateSerializer(serializers.ModelSerializer):
    candidate_applications = ApplicationSerializer(many=True, read_only=True)

    class Meta:
        model = Candidate
        fields = "__all__"
