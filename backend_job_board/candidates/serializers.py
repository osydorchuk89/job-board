from rest_framework import serializers
from .models import Candidate
from vacancies.serializers import ApplicationSerializer


class CandidateSerializer(serializers.ModelSerializer):
    candidate_applications = ApplicationSerializer(many=True, read_only=True)
    first_name = serializers.SerializerMethodField("get_first_name")
    last_name = serializers.SerializerMethodField("get_last_name")
    email = serializers.SerializerMethodField("get_email")

    def get_first_name(self, obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.first_name

    def get_email(self, obj):
        return obj.user.email

    class Meta:
        model = Candidate
        fields = "__all__"
