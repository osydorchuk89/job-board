from rest_framework_nested import routers
from rest_framework.routers import DefaultRouter
from .views import CandidateViewSet
from vacancies.views import ApplicationViewSet


router = routers.DefaultRouter()
router.register("", CandidateViewSet, basename="candidate")

candidates_router = routers.NestedDefaultRouter(router, "", lookup="candidate")
candidates_router.register("applications", ApplicationViewSet, basename="applications")

urlpatterns = router.urls
