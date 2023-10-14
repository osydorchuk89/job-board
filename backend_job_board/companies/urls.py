from rest_framework_nested import routers
from .views import CompanyViewSet, RecruiterViewSet

router = routers.DefaultRouter()
router.register("", CompanyViewSet, basename="company")

companies_router = routers.NestedDefaultRouter(router, "", lookup="company")
companies_router.register("recruiters", RecruiterViewSet, basename="recruiters")

urlpatterns = router.urls + companies_router.urls
