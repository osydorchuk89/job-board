from rest_framework import serializers
from .models import Recruiter
from vacancies.serializers import ApplicationSerializer


class RecruiterSerializer(serializers.ModelSerializer):
    recruiter_applications = ApplicationSerializer(many=True, read_only=True)

    class Meta:
        model = Recruiter
        fields = "__all__"
