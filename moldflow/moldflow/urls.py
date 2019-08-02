from django.conf.urls import url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import include, path
from rest_framework import routers

from users import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),  # api endpoint
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),  # add login to api
]

urlpatterns += staticfiles_urlpatterns()  # static files for gunicorn
