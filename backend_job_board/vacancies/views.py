from rest_framework import viewsets
from rest_framework.permissions import DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly
from .models import Vacancy, Application
from .serializers import VacancySerializer, ApplicationSerializer
from .permissions import EditDeleteVacancyPermission, ViewApplicationPermission


class VacancyViewSet(viewsets.ModelViewSet, EditDeleteVacancyPermission):
    serializer_class = VacancySerializer
    permission_classes = [EditDeleteVacancyPermission, DjangoModelPermissionsOrAnonReadOnly]

    def get_queryset(self):
        queryset = Vacancy.objects.select_related("recruiter").all()

        company_value = self.request.query_params.get("company")
        title_value = self.request.query_params.get("title")
        city_value = self.request.query_params.get("city")
        recruiter_id = self.request.query_params.get("recruiter")
        employment_type_value = self.request.query_params.get("employment_type")

        if company_value is not None:
            queryset = queryset.filter(recruiter__company__icontains=company_value)

        if title_value is not None:
            queryset = queryset.filter(title__icontains=title_value)

        if city_value is not None:
            queryset = queryset.filter(city__icontains=city_value)

        if recruiter_id is not None:
            queryset = queryset.filter(recruiter=recruiter_id)

        if employment_type_value is not None:
            queryset = queryset.filter(employment_type=employment_type_value)

        return queryset


class ApplicationViewSet(viewsets.ModelViewSet, ViewApplicationPermission):
    serializer_class = ApplicationSerializer
    permission_classes = [ViewApplicationPermission, DjangoModelPermissions]

    def get_queryset(self):
        queryset = Application.objects.select_related(
            "recruiter", "vacancy", "candidate", "candidate__user"
        ).filter(vacancy_id=self.kwargs["vacancy_pk"])
        return queryset
