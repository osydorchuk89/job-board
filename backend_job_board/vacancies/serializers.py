from rest_framework import serializers
from .models import Vacancy, Application


class VacancySerializer(serializers.ModelSerializer):
    company = serializers.SerializerMethodField("get_company")

    def get_company(self, obj):
        return obj.recruiter.company

    class Meta:
        model = Vacancy
        fields = "__all__"


class ApplicationSerializer(serializers.ModelSerializer):
    vacancy_title = serializers.SerializerMethodField("get_vacancy_title")
    vacancy_company = serializers.SerializerMethodField("get_vacancy_company")
    candidate_name = serializers.SerializerMethodField("get_candidate_name")
    candidate_email = serializers.SerializerMethodField("get_candidate_email")
    candidate_phone = serializers.SerializerMethodField("get_candidate_phone")

    def get_vacancy_company(self, obj):
        return obj.recruiter.company

    def get_vacancy_title(self, obj):
        return obj.vacancy.title

    def get_candidate_name(self, obj):
        return f"{obj.candidate.user.first_name} {obj.candidate.user.last_name}"

    def get_candidate_email(self, obj):
        return obj.candidate.user.email

    def get_candidate_phone(self, obj):
        return obj.candidate.phone

    class Meta:
        model = Application
        fields = "__all__"
