from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("jet/", include("jet.urls", "jet")),
    path("jet/dashboard/", include("jet.dashboard.urls", "jet-dashboard")),
    path("api/", include("users.urls")),  # api endpoint
    path(
        "api-auth/", include("rest_framework.urls", namespace="rest_framework")
    ),  # add login to api
]

admin.site.site_header = "Backend on Demand administration"
admin.site.site_title = "Admin"
admin.site.index_title = "Administration"

urlpatterns += staticfiles_urlpatterns()  # static files for gunicorn
