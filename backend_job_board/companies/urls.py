from django.urls import include, path
from rest_framework_nested import routers
from .views import CompanyViewSet, VacancyViewSet, RecruiterViewSet, ApplicationViewSet

router = routers.DefaultRouter()
router.register("", CompanyViewSet, basename="company")
# router.register("applications", ApplicationViewSet, basename="application")

companies_router = routers.NestedDefaultRouter(router, "", lookup="company")
companies_router.register("vacancies", VacancyViewSet, basename="vacancies")
companies_router.register("recruiters", RecruiterViewSet, basename="recruiters")

vacancies_router = routers.NestedDefaultRouter(companies_router, "vacancies", lookup="vacancy")
vacancies_router.register("applications", ApplicationViewSet, basename="applications")

urlpatterns = router.urls + companies_router.urls + vacancies_router.urls
