from django.conf import settings
from mixer.backend.django import mixer
from rest_framework.test import APITestCase

from . import models


class TestJobView(APITestCase):
    def setUp(self):
        self.user = mixer.blend(
            "users.CustomUser", is_active=True, phone="+31230802611"
        )
        self.job = mixer.blend("jobs.Job", owner=self.user)
        self.client.force_authenticate(self.user)

    def test_model(self):
        assert (
            self.job is not None
        ), "Should create a Job instance, if a user is authenticated."

    def test_defaults(self):
        """
        Test if default model values get set and everything is valid
        """

        assert self.job.estimated is None
        assert not self.job.result
        assert self.job.progress == 0
        assert str(self.job.owner) == str(self.user.email)

    def test_admin_url(self):
        job_url = models.Job.get_admin_url(self.job)

        # TODO: change example.com to proper domain name
        assert job_url == "example.com" + "/admin/jobs/job/{0}/change/".format(
            self.job.pk
        )
