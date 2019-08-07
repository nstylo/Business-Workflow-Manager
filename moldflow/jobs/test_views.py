from django.contrib.auth import get_user_model
from django.test import RequestFactory, TransactionTestCase
from mixer.backend.django import mixer
from rest_framework.test import APITestCase

from . import views


class TestJobView(APITestCase):
    def test_anonymouos(self):
        req = RequestFactory().get("/api/jobs/")
        resp = views.JobView.as_view({"get": "list"})(req)

        print(resp.data)
        assert resp.status_code == 403, 'Only logged in or staff users should be allowed to see jobs'
        assert resp.data == {"detail:": "Authentication credentials were not provided."}
