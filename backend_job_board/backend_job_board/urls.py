from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings
from core.views import TokenObtainPairView


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("auth/jwt/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    path("api/candidates/", include("candidates.urls")),
    path("api/companies/", include("companies.urls")),
    path("api/vacancies/", include("vacancies.urls")),
    path("api/feedback/", include("feedback.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
