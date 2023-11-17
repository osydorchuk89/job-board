from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .models import Recruiter
from .serializers import RecruiterSerializer


# class CompanyViewSet(viewsets.ModelViewSet, EditDeleteCompanyPermission):
#     serializer_class = CompanySerializer
#     permission_classes = [EditDeleteCompanyPermission, DjangoModelPermissionsOrAnonReadOnly]

#     def get_queryset(self):
#         queryset = Company.objects.all()
#         industry_value = self.request.query_params.get("industry")
#         if industry_value is not None:
#             queryset = queryset.filter(industry=industry_value)
#         return queryset


class RecruiterViewSet(viewsets.ModelViewSet):
    serializer_class = RecruiterSerializer
    queryset = Recruiter.objects.all()

    @action(detail=False, methods=["GET", "PUT"], permission_classes=[IsAuthenticated])
    def me(self, request):
        (candidate, created) = Recruiter.objects.get_or_create(user_id=request.user.id)
        if request.method == "GET":
            serializer = RecruiterSerializer(candidate)
            return Response(serializer.data)
        elif request.method == "PUT":
            serializer = RecruiterSerializer(candidate, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

    # def get_permissions(self):
    #     if self.request.method == "GET":
    #         return [IsAdminUser()]
    #     elif self.request.method == "POST":
    #         return [AllowAny()]
    #     return [permission() for permission in self.permission_classes]
