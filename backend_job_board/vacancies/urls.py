from rest_framework_nested import routers
from .views import VacancyViewSet, ApplicationViewSet

router = routers.DefaultRouter()
router.register("", VacancyViewSet, basename="vacancy")

vacancies_router = routers.NestedDefaultRouter(router, "", lookup="vacancy")
vacancies_router.register("applications", ApplicationViewSet, basename="applications")

urlpatterns = router.urls + vacancies_router.urls
