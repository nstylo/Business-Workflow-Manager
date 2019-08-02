from django.conf.urls import include, url
from django.urls import path
from rest_framework import routers

from users.views import LoginView, UserViewSet

router = routers.DefaultRouter()
router.register(r"users", UserViewSet)

urlpatterns = [
    url(r"^", include(router.urls)),
    url(r"^auth/", include("django_registration.backends.activation.urls")),
    path("auth/login/", LoginView.as_view()),
]
