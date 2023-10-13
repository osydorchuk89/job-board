from rest_framework import serializers
from phonenumber_field.serializerfields import PhoneNumberField
from .models import Company, Vacancy, Recruiter, Application


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ["id", "name", "country", "industry", "linkedIn"]


class RecruiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recruiter
        fields = ["id", "name", "email", "phone", "linkedIn", "company"]


class VacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = [
            "id",
            "title",
            "company",
            "recruiter",
            "description",
            "salary",
            "industry",
            "employmentType",
            "workMode",
            "postingDate",
            "slug",
        ]


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ["id", "vacancy", "applicant", "cv", "submissionDate"]
