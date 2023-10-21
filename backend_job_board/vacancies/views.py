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
            queryset = queryset.filter(company__icontains=company_value)

        if title_value is not None:
            queryset = queryset.filter(title__icontains=title_value)

        if country_value is not None:
            queryset = queryset.filter(country__icontains=country_value)

        if city_value is not None:
            queryset = queryset.filter(city__icontains=city_value)

        if industry_value is not None:
            queryset = queryset.filter(industry__icontains=industry_value)

        return queryset


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        return Application.objects.filter(vacancy_id=self.kwargs["vacancy_pk"])
