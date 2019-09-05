from django.conf.urls import include, url
from django.urls import path
from rest_framework import routers

from .views import UserViewSet
from jobs.views import JobView

router = routers.DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"jobs", JobView)


urlpatterns = [
    url(r"^", include(router.urls)),
    path("auth/", include("rest_registration.api.urls")),
]
