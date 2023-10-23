from rest_framework import serializers
from .models import Vacancy, Application


class VacancySerializer(serializers.ModelSerializer):
    # company = serializers.SerializerMethodField(source="company.name")

    class Meta:
        model = Vacancy
        fields = "__all__"

    # https://stackoverflow.com/a/52491357/16772424
    def to_representation(self, instance):
        representation = super(VacancySerializer, self).to_representation(instance)
        representation["company"] = instance.company.name
        return representation


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ["id", "vacancy", "applicant", "cv", "submission_date"]
