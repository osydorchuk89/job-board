from rest_framework import serializers
from .models import Vacancy, Application


class VacancySerializer(serializers.ModelSerializer):
    company = serializers.SerializerMethodField()

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
        ]

    def get_company(self, instance):
        return instance.company.name


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ["id", "vacancy", "applicant", "cv", "submission_date"]
