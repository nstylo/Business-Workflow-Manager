from django.test import RequestFactory
from mixer.backend.django import mixer
from rest_framework.test import APITestCase

from . import views


class TestJobViewAnonymous(APITestCase):
    def test_get_list(self):
        req = RequestFactory().get("/api/jobs/")
        resp = views.JobView.as_view({"get": "list"})(req)

        assert resp.status_code == 403, "Only staff should be able to see the job list"
        assert resp.data["detail"] == "Authentication credentials were not provided."

    def test_post(self):
        with open("req.txt") as file:
            resp = self.client.post(
                "/api/jobs/",
                {
                    "name": "New job name",
                    "description": "New job description",
                    "project": file,
                },
            )

        assert resp.status_code == 403, "A user needs to be authorized to post a job."
        assert resp.data["detail"] == "Authentication credentials were not provided."


class TestJobViewNonStaff(APITestCase):
    def setUp(self):
        self.user = mixer.blend(
            "users.CustomUser", is_active=True, phone="+31230802611"
        )
        # this user is needed so that the email gets sent to staff
        mixer.blend(
            "users.CustomUser", is_staff=True, is_active=True, phone="+31230802611"
        )
        self.client.force_authenticate(self.user)

    def test_get_list_empty(self):
        user1 = mixer.blend("users.CustomUser",
                            is_active=True, phone="+31230802611")
        mixer.blend("jobs.Job", owner=user1)
        resp = self.client.get("/api/jobs/")

        assert resp.status_code == 200, "The user should see their own job list"
        assert resp.data["count"] == 0, "The user didn't create any of his own jobs"

    def test_get_list_created(self):
        user1 = mixer.blend("users.CustomUser",
                            is_active=True, phone="+31230802611")
        mixer.blend("jobs.Job", owner=user1)
        mixer.blend("jobs.Job", owner=self.user)
        resp = self.client.get("/api/jobs/")

        assert resp.status_code == 200, "The user should see their own job list"
        assert resp.data["count"] == 1, "The user didn't create any of his own jobs"
        assert (
            str(self.user.pk) in resp.data["results"][0]["owner"]
        ), "The owner of the job should be associated with it"

    def test_post(self):
        job_name = "New job name"
        job_description = "New job description"
        job_file = "req.txt"
        with open(job_file) as file:
            resp = self.client.post(
                "/api/jobs/",
                {"name": job_name, "description": job_description, "project": file},
            )

        assert (
            resp.status_code == 201
        ), "A logged in user should be able to create a job."
        # TODO: figure out url mocking
        # assert resp.data.get("url") == "http://testserver/api/jobs/{0}/".format(
        # self.user.pk
        # )
        print(resp.data)
        assert resp.data.get("name") == job_name
        assert resp.data.get("description") == job_description
        assert resp.data.get("estimated") is None
        assert resp.data.get("progress") == 0
        assert resp.data.get("result") is None
        assert resp.data.get("created") is not None
        assert resp.data.get("created")
        assert str(self.user.pk) in resp.data.get("owner")
        # TODO: mock the url to test it and 'created'

    def test_delete(self):
        self.job = mixer.blend("jobs.Job", owner=self.user)

        resp = self.client.delete("/api/jobs/{0}/".format(self.job.pk))

        assert (
            resp.status_code == 204
        ), "A successful delete without further information returns 204 with None"
        assert resp.data is None


class TestJobViewStaff(APITestCase):
    def setUp(self):
        self.user = mixer.blend(
            "users.CustomUser", is_staff=True, is_active=True, phone="+31230802611"
        )
        self.client.force_authenticate(self.user)

    def test_get_list(self):
        user1 = mixer.blend("users.CustomUser",
                            is_active=True, phone="+31230802611")
        mixer.blend("jobs.Job", owner=user1)
        resp = self.client.get("/api/jobs/")

        assert (
            resp.status_code == 200
        ), "The staff user should be able to see other jobs."
        assert resp.data["count"] == 1, "The staff user sees other jobs"

    def test_get_list_created(self):
        user1 = mixer.blend("users.CustomUser",
                            is_active=True, phone="+31230802611")
        mixer.blend("jobs.Job", owner=user1)
        mixer.blend("jobs.Job", owner=self.user)
        resp = self.client.get("/api/jobs/")

        assert resp.status_code == 200, "The staff user should see all jobs"
        assert resp.data["count"] == 2, "The staff user should see all jobs"
        # TODO: verify that the correct user gets associated with the job

    def test_post(self):
        job_name = "New job name"
        job_description = "New job description"
        job_file = "req.txt"
        with open(job_file) as file:
            resp = self.client.post(
                "/api/jobs/",
                {"name": job_name, "description": job_description, "project": file},
            )

        assert (
            resp.status_code == 201
        ), "A logged in user should be able to create a job."
        # TODO: figure out url mocking
        # assert resp.data.get("url") == "http://testserver/api/jobs/{0}/".format(
        # self.user.pk
        # )
        # assert resp.data.get("owner") == self.user.company
        assert resp.data.get("name") == job_name
        assert resp.data.get("description") == job_description
        assert resp.data.get("estimated") is None
        assert resp.data.get("progress") == 0
        assert resp.data.get("result") is None
        # TODO: mock the url to test it and 'created'

    def test_delete(self):
        user1 = mixer.blend("users.CustomUser",
                            is_active=True, phone="+31230802611")
        job1 = mixer.blend("jobs.Job", owner=user1)

        resp = self.client.delete("/api/jobs/{0}/".format(job1.pk))

        assert (
            resp.status_code == 204
        ), "A successful delete without further information returns 204 with None"
        assert resp.data is None
