from django.core import mail
from django.test import TestCase
from mixer.backend.django import mixer

from jobs.emails import EmailJob, EmailJobStaff, EmailJobClient


class TestEmailJobStaff(TestCase):
    def setUp(self):
        self.user = mixer.blend(
            "users.CustomUser", is_active=True, phone="+31230802611"
        )
        self.job = mixer.blend("jobs.Job", owner=self.user)
        self.job_email = EmailJobStaff(job=self.job)

    def test_send_mail(self):
        email = EmailJob(subject="Test subject", body="Test body", job=self.job)
        email.send_mail()

        assert len(mail.outbox) == 1, "Email has to be sent"
        assert mail.outbox[0].subject == email.subject, "Email subject has to match"
        assert mail.outbox[0].body == email.plain_body, "Email body has to match"

    def test_compose_job_subject_staff(self):
        self.job_email._compose_subject_staff()

        subject = "A new job has been posted for {0}.".format(
            self.user.company)
        assert self.job_email.subject == subject

    def test_send_mail_staff(self):
        mixer.blend(
            "users.CustomUser", is_staff=True, is_active=True, phone="+31230802611"
        )
        mixer.blend(
            "users.CustomUser", is_staff=True, is_active=True, phone="+31230802611"
        )
        self.job_email.send_mail()

        assert self.job_email.subject is not False, "Email subject can't be empty"
        assert self.job_email.plain_body is not False, "Email body can't be empty"
        assert len(mail.outbox) == 1, "Email has to be sent"
        assert len(mail.outbox[0].to) == 2, "There are 2 receiving staff members"
        assert mail.outbox[0].subject == self.job_email.subject, "Email subject has to match"
        assert mail.outbox[0].body == self.job_email.plain_body, "Email body has to match"


class TestEmailJobClient(TestCase):
    def setUp(self):
        self.user = mixer.blend(
            "users.CustomUser", is_active=True, is_staff=False, phone="+31230802611"
        )
        self.job = mixer.blend("jobs.Job", owner=self.user)
        self.job_email = EmailJobClient(job=self.job)

    def test_send_mail_client(self):
        self.job_email.send_mail()

        assert self.job_email.subject is not False, "Email subject can't be empty"
        assert self.job_email.plain_body is not False, "Email body can't be empty"
        assert len(mail.outbox) == 1, "Email has to be sent"
        assert len(mail.outbox[0].to) == 1, "There is exactly 1 receiving client member"
        assert mail.outbox[0].subject == self.job_email.subject, "Email subject has to match"
        assert mail.outbox[0].body == self.job_email.plain_body, "Email body has to match"


class TestEmailJobClientNotActive(TestCase):
    def test_send_mail_client_not_active(self):
        self.user = mixer.blend(
            "users.CustomUser", is_staff=False, is_active=False, phone="+31230802611"
        )
        self.job = mixer.blend("jobs.Job", owner=self.user)
        self.job_email = EmailJobClient(job=self.job)
        with self.assertRaises(ValueError):
            self.job_email.send_mail()
