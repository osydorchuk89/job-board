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
    # recruiter = serializers.SerializerMethodField("get_recruiter")

    # def get_recruiter(self, obj):
    #     return obj.vacancy.recruiter.id

    class Meta:
        model = Application
        fields = "__all__"
