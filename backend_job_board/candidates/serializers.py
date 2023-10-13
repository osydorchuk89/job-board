from rest_framework import serializers
from phonenumber_field.serializerfields import PhoneNumberField
from .models import Candidate


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ["name", "email", "phone", "linkedIn", "cv"]
