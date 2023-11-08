from rest_framework import viewsets
from .models import Company, Recruiter
from .serializers import CompanySerializer, RecruiterSerializer


class CompanyViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySerializer

    def get_queryset(self):
        queryset = Company.objects.all()
        industry_value = self.request.query_params.get("industry")
        if industry_value is not None:
            queryset = queryset.filter(industry=industry_value)
        return queryset


class RecruiterViewSet(viewsets.ModelViewSet):
    serializer_class = RecruiterSerializer
    queryset = Recruiter.objects.all()
    # def get_queryset(self):
    #     return Recruiter.objects.filter(company_id=self.kwargs["company_pk"])
