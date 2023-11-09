from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, DjangoModelPermissionsOrAnonReadOnly
from .models import Vacancy, Application
from .serializers import VacancySerializer, ApplicationSerializer
from .permissions import EditDeleteVacancyPermission, ViewApplicationPermission


class VacancyViewSet(viewsets.ModelViewSet, EditDeleteVacancyPermission):
    serializer_class = VacancySerializer
    permission_classes = [EditDeleteVacancyPermission, DjangoModelPermissionsOrAnonReadOnly]

    def get_queryset(self):
        queryset = Vacancy.objects.all()

        company_value = self.request.query_params.get("company")
        title_value = self.request.query_params.get("title")
        country_value = self.request.query_params.get("country")
        city_value = self.request.query_params.get("city")
        industry_value = self.request.query_params.get("industry")

        if company_value is not None:
            queryset = queryset.filter(company__name__icontains=company_value)

        if title_value is not None:
            queryset = queryset.filter(title__icontains=title_value)

        if country_value is not None:
            queryset = queryset.filter(country__icontains=country_value)

        if city_value is not None:
            queryset = queryset.filter(city__icontains=city_value)

        if industry_value is not None:
            queryset = queryset.filter(industry__icontains=industry_value)

        return queryset


class ApplicationViewSet(viewsets.ModelViewSet, ViewApplicationPermission):
    serializer_class = ApplicationSerializer
    permission_classes = [ViewApplicationPermission, IsAdminUser]

    def get_queryset(self):
        return Application.objects.filter(vacancy_id=self.kwargs["vacancy_pk"])
