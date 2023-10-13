from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework_extensions.utils import compose_parent_pk_kwarg_name

from .models import Company, Recruiter, Vacancy, Application
from .serializers import CompanySerializer, RecruiterSerializer, VacancySerializer, ApplicationSerializer


class CompanyViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySerializer

    def get_queryset(self):
        queryset = Company.objects.all()
        countryName = self.request.query_params.get("country")
        industryName = self.request.query_params.get("industry")
        if countryName is not None:
            queryset = queryset.filter(country=countryName)
        if industryName is not None:
            queryset = queryset.filter(industry=industryName)
        return queryset


class RecruiterViewSet(viewsets.ModelViewSet):
    serializer_class = RecruiterSerializer

    def get_queryset(self):
        return Recruiter.objects.filter(company_id=self.kwargs["company_pk"])


class VacancyViewSet(viewsets.ModelViewSet):
    serializer_class = VacancySerializer

    def get_queryset(self):
        return Vacancy.objects.filter(company_id=self.kwargs["company_pk"])


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        return Application.objects.filter(vacancy_id=self.kwargs["vacancy_pk"])
