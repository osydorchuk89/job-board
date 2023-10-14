from django.shortcuts import render
from rest_framework import viewsets

from .models import Vacancy, Application
from .serializers import VacancySerializer, ApplicationSerializer


class VacancyViewSet(viewsets.ModelViewSet):
    serializer_class = VacancySerializer

    def get_queryset(self):
        queryset = Vacancy.objects.all()

        company_value = self.request.query_params.get("company")
        title_value = self.request.query_params.get("title")
        country_value = self.request.query_params.get("country")
        city_value = self.request.query_params.get("city")
        industry_value = self.request.query_params.get("industry")

        if company_value is not None:
            queryset = queryset.filter(company=company_value)

        if title_value is not None:
            queryset = queryset.filter(title=title_value)

        if country_value is not None:
            queryset = queryset.filter(location_country=country_value)

        if city_value is not None:
            queryset = queryset.filter(location_city=city_value)

        if industry_value is not None:
            queryset = queryset.filter(industry=industry_value)

        return queryset


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        return Application.objects.filter(vacancy_id=self.kwargs["vacancy_pk"])
