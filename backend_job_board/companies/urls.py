# from rest_framework_nested import routers
from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet, RecruiterViewSet

router = DefaultRouter()
router.register("companies", CompanyViewSet, basename="company")
router.register("recruiters", RecruiterViewSet, basename="recruiters")

# companies_router = routers.NestedDefaultRouter(router, "", lookup="company")
# companies_router.register("recruiters", RecruiterViewSet, basename="recruiters")

urlpatterns = router.urls
