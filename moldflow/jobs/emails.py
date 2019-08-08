from django.conf import settings
from django.core.mail import EmailMessage, send_mail


class EmailJob(EmailMessage):
    def __init__(
        self,
        job,
        subject="",
        body="",
        sender=[settings.EMAIL_HOST_USER],
        receiver=["receiver@mail.com"],
    ):
        self.subject = subject
        self.body = body
        self.sender = sender
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
        self.body = """A new job \"{0}\" has been posted for {1}.
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

    def _get_staff(self):
        self.receiver = self.job.owner.__class__.objects.filter(
            is_staff=True, is_active=True
        ).values_list("email", flat=True)

    def send_mail(self):
        self._get_staff()
        self._compose_subject_staff()
        self._compose_body_staff()
        send_mail(self.subject, self.body, self.sender, self.receiver)


class EmailJobClient(EmailJob):
    """
    Handles sending client emails when a new job gets created
    """

    def _compose_subject_client(self):
        """
        Compose the job email subject for client
        """
        self.subject = "A new job has been posted for {0}.".format(
            self.job.owner.company
        )

    def _compose_body_client(self):
        """
        The body of the email for sending out a
        notification that a job has been added to client
        """
        self.body = """The results of your \"{0}\" project have been uploaded!"
You can now see your results project at: {1}
Kind Regards,\n***REMOVED***""".format(
            self.job.name, self.job.get_admin_url()
        )

    def _get_client(self):
        self.receiver = self.job.owner.__class__.objects.filter(
            is_active=True
        ).values_list("email", flat=True)

    def send_mail(self):
        self._get_client()
        self._compose_subject_client()
        self._compose_body_client()
        send_mail(self.subject, self.body, self.sender, self.receiver)
