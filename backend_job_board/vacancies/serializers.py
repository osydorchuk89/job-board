from rest_framework import serializers
from .models import Vacancy, Application


class VacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = [
            "id",
            "title",
            "company",
            "recruiter",
            "city",
            "country",
            "description",
            "salary",
            "industry",
            "employment_type",
            "work_mode",
            "posting_date",
            "slug",
        ]


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ["id", "vacancy", "applicant", "cv", "submission_date"]
