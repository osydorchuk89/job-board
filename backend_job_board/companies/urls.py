from rest_framework.routers import DefaultRouter
from .views import RecruiterViewSet

router = DefaultRouter()
router.register("recruiters", RecruiterViewSet, basename="recruiters")

urlpatterns = router.urls
