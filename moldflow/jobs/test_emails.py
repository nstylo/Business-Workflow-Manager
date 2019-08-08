from django.core import mail
from django.test import TestCase
from mixer.backend.django import mixer

from jobs.emails import EmailJob, EmailJobStaff


class TestEmailJobStaff(TestCase):
    def setUp(self):
        self.user = mixer.blend(
            "users.CustomUser", is_active=True, phone="+31230802611"
        )
        self.job = mixer.blend("jobs.Job", owner=self.user)
        self.job_email = EmailJobStaff(job=self.job, sender=self.user.email)

    def test_send_mail(self):
        email = EmailJob(subject="Test subject", body="Test body", job=self.job)
        email.send_mail()

        assert len(mail.outbox) == 1, "Email has to be sent"
        assert mail.outbox[0].subject == email.subject, "Email subject has to match"
        assert mail.outbox[0].body == email.body, "Email body has to match"

    def test_compose_job_subject_staff(self):
        self.job_email._compose_subject_staff()

        subject = "A new job has been posted for {0}.".format(
            self.user.company)
        assert self.job_email.subject == subject

    def test_compose_job_body_staff(self):
        self.job_email._compose_body_staff()

        body = """A new job \"{0}\" has been posted for {1}.
Please update the estimated time to completion ASAP.
Description: {2}
Email: {3}
Timestamp: {4}
Job url: {5}""".format(
            self.job.name,
            self.job.owner.company,
            self.job.description,
            self.job.owner.email,
            self.job.created,
            self.job.get_admin_url(),
        )
        assert self.job_email.body == body

    def test_send_mail_staff(self):
        mixer.blend(
            "users.CustomUser", is_staff=True, is_active=True, phone="+31230802611"
        )
        mixer.blend(
            "users.CustomUser", is_staff=True, is_active=True, phone="+31230802611"
        )
        self.job_email.send_mail()

        assert self.job_email.subject is not False, "Email subject can't be empty"
        assert self.job_email.body is not False, "Email body can't be empty"
        assert len(mail.outbox) == 1, "Email has to be sent"
        assert len(mail.outbox[0].to) == 2, "There are 2 receiving staff members"
        assert mail.outbox[0].subject == self.job_email.subject, "Email subject has to match"
        assert mail.outbox[0].body == self.job_email.body, "Email body has to match"
