from django.core import mail
from mixer.backend.django import mixer
from rest_framework.test import APITestCase

from . import models


class TestJobView(APITestCase):
    def setUp(self):
        self.user = mixer.blend(
            "users.CustomUser", is_active=True, phone="+31230802611"
        )
        # this user is needed so that the email gets sent to staff
        mixer.blend(
            "users.CustomUser", is_staff=True, is_active=True, phone="+31230802611"
        )
        self.job = mixer.blend("jobs.Job", owner=self.user)
        mail.outbox.clear()
        self.client.force_authenticate(self.user)

    def test_model(self):
        assert (
            self.job is not None
        ), "Should create a Job instance, if a user is authenticated."

    def test_defaults(self):
        """
        Test if default model values get set and everything is valid
        """

        assert str(self.job.owner) == str(self.user.email)

        assert self.job.name is not None, "The name of the job shouldn't be empty"
        assert self.job.name is not False, "The name of the job shouldn't be empty"

        assert (
            self.job.description is not None
        ), "The description of the job shouldn't be empty"
        assert (
            self.job.description is not False
        ), "The description of the job shouldn't be empty"

        assert (
            self.job.created is not None
        ), "The description of the job shouldn't be empty"
        assert (
            self.job.created is not False
        ), "The description of the job shouldn't be empty"

        assert self.job.estimated is None, "At first there should be no estimation"
        assert not self.job.result, "At first there should be no result uploaded"
        assert self.job.progress == 0, "At first the progress should not be updated"

    def test_result_upload(self):
        """
        Test if default model values get set and everything is valid
        """
        self.job.result = "test"
        self.job.save()

        assert (
            "have been uploaded!" in mail.outbox[0].body
        ), "The result first gets uploaded, not updated."

        assert str(self.job.owner) == str(self.user.email)

        assert self.job.name is not None, "The name of the job shouldn't be empty"
        assert self.job.name is not False, "The name of the job shouldn't be empty"

        assert (
            self.job.description is not None
        ), "The description of the job shouldn't be empty"
        assert (
            self.job.description is not False
        ), "The description of the job shouldn't be empty"

        assert (
            self.job.created is not None
        ), "The description of the job shouldn't be empty"
        assert (
            self.job.created is not False
        ), "The description of the job shouldn't be empty"

        assert (
            self.job.estimated is not None
        ), "On result upload, the estimated time should be set to now"
        assert (
            self.job.result is not None
        ), "On result upload, the result file shouldn't be null"
        assert (
            self.job.progress == 100
        ), "On result upload, the job is finished and progress should be 100"

    def test_result_update(self):
        """
        Test if default model values get set and everything is valid
        """
        self.job.result = "test"
        self.job.save()
        mail.outbox.clear()
        # trigger update
        self.job.result = "test1"
        self.job.save()

        assert (
            "have been updated!" in mail.outbox[0].body
        ), "The result should get updated."

        assert str(self.job.owner) == str(self.user.email)

        assert self.job.name is not None, "The name of the job shouldn't be empty"
        assert self.job.name is not False, "The name of the job shouldn't be empty"

        assert (
            self.job.description is not None
        ), "The description of the job shouldn't be empty"
        assert (
            self.job.description is not False
        ), "The description of the job shouldn't be empty"

        assert (
            self.job.created is not None
        ), "The description of the job shouldn't be empty"
        assert (
            self.job.created is not False
        ), "The description of the job shouldn't be empty"

        assert (
            self.job.estimated is not None
        ), "On result upload, the estimated time should be set to now"
        assert (
            self.job.result is not None
        ), "On result upload, the result file shouldn't be null"
        assert (
            self.job.progress == 100
        ), "On result upload, the job is finished and progress should be 100"

    def test_admin_url(self):
        job_url = models.Job.get_admin_url(self.job)

        # TODO: change example.com to proper domain name
        assert job_url == "example.com" + "/admin/jobs/job/{0}/change/".format(
            self.job.pk
        )
