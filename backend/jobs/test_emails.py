from django.core import mail
from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework.test import APITestCase

from jobs.emails import EmailJobClient


class TestEmailJobStaff(APITestCase):
    def test_send_mail_staff_good(self):
        user1 = mixer.blend(
            "users.CustomUser", is_staff=False, is_active=True, phone="+31230802611"
        )
        user2 = mixer.blend(
            "users.CustomUser", is_staff=False, is_active=False, phone="+31230802611"
        )
        staff1 = mixer.blend(
            "users.CustomUser", is_staff=True, is_active=True, phone="+31230802611"
        )
        staff2 = mixer.blend(
            "users.CustomUser", is_staff=True, is_active=False, phone="+31230852611"
        )
        staff3 = mixer.blend(
            "users.CustomUser", is_staff=True, is_active=True, phone="+31230852611"
        )

        # the mail gets sent on a job create event
        job = mixer.blend("jobs.Job", owner=user1)

        plain_outbox_body = mail.outbox[0].body
        html_outbox_body = str(mail.outbox[0].alternatives[0])

        assert (
            "Please update the estimated time to job completion as soon as possible."
            in plain_outbox_body
        )
        assert (
            "Please update the estimated time to job completion as soon as possible."
            in html_outbox_body
        )

        assert (
            "Owner Company: " + job.owner.company in plain_outbox_body
        ), "The owner company details need to be sent"
        assert (
            "Owner Company: " + job.owner.company in html_outbox_body
        ), "The owner company details need to be sent"

        assert (
            "Owner Company: " + user1.company in plain_outbox_body
        ), "The owner company details need to be sent"
        assert (
            "Owner Company: " + user1.company in html_outbox_body
        ), "The owner company details need to be sent"

        assert (
            "Name: " + job.name in plain_outbox_body
        ), "The name of the job needs to be sent"
        assert (
            "Name: " + job.name in html_outbox_body
        ), "The name of the job needs to be sent"

        assert (
            "Description: " + job.description in plain_outbox_body
        ), "The description of the job needs to be sent"
        assert (
            "Description: " + job.description in html_outbox_body
        ), "The description of the job needs to be sent"

        assert (
            "Owner Email: " + job.owner.email in plain_outbox_body
        ), "The owner's email of the job needs to be sent"
        assert (
            "Owner Email: " + job.owner.email in html_outbox_body
        ), "The owner's email of the job needs to be sent"

        assert (
            "Owner Email: " + user1.email in plain_outbox_body
        ), "The owner's email of the job needs to be sent"
        assert (
            "Owner Email: " + user1.email in html_outbox_body
        ), "The owner's email of the job needs to be sent"

        # let's get the File url matched line
        # check that the url (first 6 chars are "File: ") has no spaces
        file_url_line = [
            line for line in plain_outbox_body.split("\n") if "File:" in line
        ][0][6:]

        html_file_url_line = [
            line for line in html_outbox_body.split("\n") if "File:" in line
        ][0][6:]

        assert " " not in file_url_line, "The url cannot have spaces"
        # assert " " not in html_file_url_line, "The url cannot have spaces"
        assert file_url_line is not False, "The url can't be empty"
        assert html_file_url_line is not False, "The url can't be empty"

        assert len(mail.outbox) == 1, "A single email has to be sent"
        assert len(
            mail.outbox[0].to) == 2, "There are 2 receiving staff members"
        assert (
            staff1.email in mail.outbox[0].to
        ), "The activated staff user should be sent the email"
        assert (
            staff3.email in mail.outbox[0].to
        ), "The activated staff user should be sent the email"
        assert (
            staff2.email not in mail.outbox[0].to
        ), "The unactivated staff user shouldn't be in the to list"

    def test_send_mail_staff_bad(self):
        user1 = mixer.blend(
            "users.CustomUser", is_staff=False, is_active=True, phone="+31230832611"
        )

        mixer.blend(
            "users.CustomUser", is_staff=True, is_active=False, phone="+31230832611"
        )
        self.client.force_authenticate(user1)

        job_name = "New job name"
        job_description = "New job description"
        job_file = "req.txt"
        with self.assertRaises(ValueError) as context:
            with open(job_file) as file:
                self.client.post(
                    "/api/jobs/",
                    {"name": job_name, "description": job_description, "project": file},
                )

            self.assertTrue(
                "The receiver of the email either does not exist or is not active"
                in context.exception
            )

        assert len(mail.outbox) == 0, "No email got sent"


class TestEmailJobClient(TestCase):
    def setUp(self):
        self.user = mixer.blend(
            "users.CustomUser", is_active=True, is_staff=False, phone="+31230802611"
        )
        # so the staff email gets sent and we don't get an exception
        mixer.blend(
            "users.CustomUser", is_active=True, is_staff=True, phone="+31230802611"
        )
        self.job = mixer.blend("jobs.Job", owner=self.user)
        mail.outbox.clear()

    def test_send_mail_client_no_update(self):
        self.job.result = "test1"
        self.job.save()
        self.plain_outbox_body = mail.outbox[0].body
        self.html_outbox_body = str(mail.outbox[0].alternatives[0])

        assert len(
            mail.outbox) == 1, "The client should receive a result upload email."
        assert len(
            mail.outbox[0].to) == 1, "Only the client should receive an email."

        assert self.job.name in mail.outbox[0].subject
        assert self.job.name in self.plain_outbox_body
        assert self.job.name in self.html_outbox_body
        assert "/user/projects/" in self.plain_outbox_body, "The url needs to be there"
        assert "Click me to view results!" in self.html_outbox_body, "The url needs to be there"
        assert "Kind Regards," in self.plain_outbox_body, "A closer needs to exist"
        assert "Kind Regards," in self.html_outbox_body, "A closer needs to exist"
        assert (
            "have been uploaded!" in self.plain_outbox_body
        ), "The result first gets uploaded, not updated."
        assert (
            "have been uploaded!" in self.html_outbox_body
        ), "The result first gets uploaded, not updated."
        assert "Dear Sir/Madam," in self.plain_outbox_body, "A greeting needs to exist"
        assert "Dear Sir/Madam," in self.html_outbox_body, "A greeting needs to exist"
        assert (
            "Company" in self.plain_outbox_body
        ), "Company company name needs to be there"
        assert (
            "Company" in self.html_outbox_body
        ), "Company company name needs to be there"

    def test_send_mail_client_update(self):
        self.job.result = "test"
        self.job.save()
        assert len(
            mail.outbox) == 1, "The first result upload email should get sent"
        self.job.result = "test"
        self.job.save()
        assert (
            len(mail.outbox) == 1
        ), "If the 2nd file is identical, no new email should be sent"
        # we don't want the first "upload" resutls email
        mail.outbox.clear()
        self.job.result = "test1"
        self.job.save()

        self.plain_outbox_body = mail.outbox[0].body
        self.html_outbox_body = str(mail.outbox[0].alternatives[0])

        assert (
            len(mail.outbox) == 1
        ), "The client should receive an email with the job results update"
        assert len(
            mail.outbox[0].to) == 1, "There is exactly 1 receiving client member"

        assert self.job.name in mail.outbox[0].subject
        assert self.job.name in self.plain_outbox_body
        assert self.job.name in self.html_outbox_body
        assert "/user/projects/" in self.plain_outbox_body, "The url needs to be there"
        assert "Click me to view results!" in self.html_outbox_body, "The url needs to be there"
        assert "Kind Regards," in self.plain_outbox_body, "A closer needs to exist"
        assert "Kind Regards," in self.html_outbox_body, "A closer needs to exist"
        assert (
            "have been updated!" in self.plain_outbox_body
        ), "The result first gets uploaded, not updated."
        assert (
            "have been updated!" in self.html_outbox_body
        ), "The result first gets uploaded, not updated."
        assert "Dear Sir/Madam," in self.plain_outbox_body, "A greeting needs to exist"
        assert "Dear Sir/Madam," in self.html_outbox_body, "A greeting needs to exist"
        assert (
            "Company" in self.plain_outbox_body
        ), "Company company name needs to be there"
        assert (
            "Company" in self.html_outbox_body
        ), "Company company name needs to be there"


class TestEmailJobClientBad(TestCase):
    def setUp(self):
        self.user = mixer.blend(
            "users.CustomUser", is_active=False, is_staff=False, phone="+31230802611"
        )
        # so the staff email gets sent and we don't get an exception
        mixer.blend(
            "users.CustomUser", is_active=True, is_staff=True, phone="+31230802611"
        )
        self.job = mixer.blend("jobs.Job", owner=self.user)

    def test_send_mail_client_update(self):
        self.job_email = EmailJobClient(job=self.job, update=True)
        with self.assertRaises(ValueError) as context:
            self.job_email.send_mail()

            self.assertTrue(
                "The receiver of the email either does not exist or is not active"
                in context.exception
            )

    def test_send_mail_client_no_update(self):
        self.job_email = EmailJobClient(job=self.job, update=False)
        with self.assertRaises(ValueError) as context:
            self.job_email.send_mail()

            self.assertTrue(
                "The receiver of the email either does not exist or is not active"
                in context.exception
            )
