from django.conf import settings
from django.core.mail import EmailMessage, send_mail
from django.template.loader import render_to_string
from django.contrib.sites.models import Site


class EmailJob(EmailMessage):
    def __init__(self, job, subject="", body="", receiver=["receiver@mail.com"]):
        self.subject = subject
        self.plain_body = body
        self.sender = [settings.EMAIL_HOST_USER]
        self.receiver = receiver
        self.job = job

    def send_mail(self):
        send_mail(self.subject, self.body, self.sender, self.receiver)


class EmailJobStaff(EmailJob):
    """
    Handles sending staff emails when a new job gets created
    """

    def _compose_subject_staff(self):
        """
        Compose the job email subject for staff
        """
        self.subject = "A new job has been posted for {0}.".format(
            self.job.owner.company
        )

    def _compose_body_staff(self):
        """
        The body of the email for sending out a
        notification that a job has been added to staff
        """
        # url for the user uploaded project file
        project_url = Site.objects.get_current().domain + settings.MEDIA_URL + str(self.job.project)

        self.html_body = render_to_string(
            "new_job_email.html",
            {
                "company": self.job.owner.company,
                "name": self.job.name,
                "description": self.job.description,
                "owner": self.job.owner.email,
                "created": self.job.created,
                "admin_url": self.job.get_admin_url(),
                "project": project_url,
            },
        )

        # alternative email for those that cannot render html
        self.plain_body = render_to_string(
            "new_job_email.txt",
            {
                "company": self.job.owner.company,
                "name": self.job.name,
                "description": self.job.description,
                "owner": self.job.owner.email,
                "created": self.job.created,
                "admin_url": self.job.get_admin_url(),
                "project": project_url,
            },
        )

    def _get_staff(self):
        """
        Set the mail receivers to all staff members that are active
        """
        self.receiver = self.job.owner.__class__.objects.filter(
            is_staff=True, is_active=True
        ).values_list("email", flat=True)

    def send_mail(self):
        self._get_staff()
        self._compose_subject_staff()
        self._compose_body_staff()
        send_mail(
            self.subject,
            self.plain_body,
            self.sender,
            self.receiver,
            html_message=self.html_body,
        )


class EmailJobClient(EmailJob):
    """
    Handles sending client emails when a new job gets created
    """

    def _compose_subject_client(self):
        """
        Compose the job email subject for client
        """
        self.subject = 'Your job "{0}" has finished!'.format(self.job.name)

    def _compose_body_client(self):
        """
        The body of the email for sending out a
        notification that a job has been added to client
        """
        # TODO: rename to ..../project/the specific project url/
        project_url = Site.objects.get_current().domain + "/user/projects/"

        self.html_body = render_to_string(
            "finished_job_email.html",
            {
                "name": self.job.name,
                "url": project_url,
            },
        )

        # alternative email for those that cannot render html
        self.plain_body = render_to_string(
            "finished_job_email.txt",
            {
                "name": self.job.name,
                "url": project_url,
            },
        )

    def _set_receiver(self):
        """
        Get clients that exist and are active
        """
        receiver = [self.job.owner.email]
        active = self.job.owner.is_active
        if receiver is not None and active:
            self.receiver = receiver
            return True
        else:
            return False

    def send_mail(self):
        """
        Send an email to the client stating that their project
        results have been uploaded, only if the client is active
        """
        if self._set_receiver():
            self._compose_subject_client()
            self._compose_body_client()
            send_mail(
                self.subject,
                self.plain_body,
                self.sender,
                self.receiver,
                html_message=self.html_body,
            )
        else:
            raise ValueError(
                "The receiver of the email either does not exist or is not active"
            )
