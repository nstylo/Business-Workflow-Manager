from django.conf.urls import include, url
from django.urls import path
from rest_framework import routers

from users.views import UserViewSet

router = routers.DefaultRouter()
router.register(r"users", UserViewSet)


urlpatterns = [
    url(r"^", include(router.urls)),
    path("auth/", include("rest_registration.api.urls")),
]
