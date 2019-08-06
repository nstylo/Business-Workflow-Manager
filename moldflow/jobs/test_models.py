from django.conf import settings
from django.core import mail
from mixer.backend.django import mixer
from rest_framework.test import APITestCase

from jobs.models import send_staff_email, upload_path

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

        assert job_url == settings.HOST + "/admin/jobs/job/{0}/change/".format(
            self.job.pk
        )

    def test_upload_path(self):
        mock_upload_path = upload_path(self.job, "file.txt")

        assert self.job.project == mock_upload_path


class TestEmails(APITestCase):
    def test_send_staff_email(self):
        self.user1 = mixer.blend(
            "users.CustomUser", is_active=True, is_staff=True, phone="+31230802611"
        )
        self.user2 = mixer.blend(
            "users.CustomUser", is_active=True, is_staff=True, phone="+31230802611"
        )
        self.user3 = mixer.blend(
            "users.CustomUser", is_active=True, is_staff=True, phone="+31230802611"
        )

        subject = "This is an email subject"
        body = "This is an email body"

        send_staff_email(subject, body)

        assert len(mail.outbox) == 1
        assert mail.outbox[0].subject == subject
        assert mail.outbox[0].body == body

        assert mail.outbox[0].from_email == settings.EMAIL_HOST_USER
        assert mail.outbox[0].to == [
            self.user1.email,
            self.user2.email,
            self.user3.email,
        ]

        # TODO: Test post_save signal compose_job_email
