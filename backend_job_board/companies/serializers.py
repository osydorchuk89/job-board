from rest_framework import serializers
from phonenumber_field.serializerfields import PhoneNumberField
from .models import Company, Recruiter


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ["id", "name", "country", "industry", "linkedin"]


class RecruiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recruiter
        fields = ["id", "name", "email", "phone", "linkedin", "company"]
