from django.test import RequestFactory
from mixer.backend.django import mixer
from rest_framework.test import APITestCase

from . import views


class TestUsersViewNotAuthenticated(APITestCase):
    def test_create(self):
        resp = self.client.post(
            "/api/users/",
            {
                "email": "test24@gmail.com",
                "phone": "+31641602602",
                "company": "test",
                "country": "test",
                "address": "test",
            },
        )

        assert (
            resp.status_code == 405
        ), "Nobody should be able to POST to this view (create an account)."
        assert (
            resp.data
            == "This endpoint does not allow for registration, use /api/auth/register/ instead."
        )

    def test_anonymous(self):
        req = RequestFactory().get("/api/users/")
        resp = views.UserViewSet.as_view({"get": "list"})(req)

        assert req.user.is_staff is False
        assert (
            resp.status_code == 403
        ), "Only logged in users (or staff) can view their user."


class TestUsersViewNonStaff(APITestCase):
    def setUp(self):
        self.user = mixer.blend(
            "users.CustomUser",
            is_admin=False,
            is_staff=False,
            is_superuser=False,
            is_active=True,
            phone="+31230802611",
        )
        self.client.force_authenticate(self.user)

    def test_non_staff_own(self):

        resp = self.client.get("/api/users/{0}/".format(self.user.pk))

        assert resp.data.get("url") == "http://testserver/api/users/{0}/".format(
            self.user.pk
        )
        assert resp.data.get("is_active") is True
        assert resp.data.get("email") == self.user.email
        assert resp.data.get("company") == self.user.company
        assert resp.data.get("country") == self.user.country
        assert resp.data.get("address") == self.user.address
        assert resp.data.get("phone") == self.user.phone
        assert (
            resp.status_code == 200
        ), "A logged in user should be able to see his own credentials."

    def test_non_staff_list(self):
        resp = self.client.get("/api/users/")

        assert resp.status_code == 403, "A non staff member can't see the user list."
        assert resp.data == {
            "detail": "You do not have permission to perform this action."
        }

    def test_non_staff_put_invalid(self):
        new_email = "asd@asdas.com"
        resp = self.client.put(
            "/api/users/{0}/".format(self.user.pk), {"email": new_email})

        assert resp.status_code == 400, "All required PUT fields need to be put in"
        assert resp.data.get("phone")[0] == "This field is required."
        assert resp.data.get("company")[0] == "This field is required."
        assert resp.data.get("country")[0] == "This field is required."
        assert resp.data.get("address")[0] == "This field is required."

    def test_non_staff_put_valid(self):
        new_email = "asd@asdas.com"
        new_phone = "+31659002647"
        new_company = "New company test"
        new_country = "NL"
        new_address = "askdljaslk"
        resp = self.client.put(
            "/api/users/{0}/".format(self.user.pk),
            {
                "phone": new_phone,
                "email": new_email,
                "company": new_company,
                "country": new_country,
                "address": new_address,
            },
        )

        assert resp.status_code == 200, "All required PUT entries need to be PUT"
        assert resp.data.get(
            "phone") == new_phone, "The new phone number should be set"
        assert resp.data.get(
            "email") == new_email, "The new email should be set"
        assert (
            resp.data.get("company") == new_company
        ), "The new company name should be set"
        assert (
            resp.data.get("country") == new_country
        ), "The new country name should be set"
        assert (
            resp.data.get("address") == new_address
        ), "The new address name should be set"

    def test_non_staff_patch_valid(self):
        new_phone = "+31650702607"
        resp = self.client.patch(
            "/api/users/{0}/".format(self.user.pk), {"phone": new_phone}
        )

        new_email = "testnewemail@gmail.com"
        resp = self.client.patch(
            "/api/users/{0}/".format(self.user.pk), {"email": new_email}
        )

        new_company = "New Company Name"
        resp = self.client.patch(
            "/api/users/{0}/".format(self.user.pk), {"company": new_company}
        )

        new_country = "New Country Name"
        resp = self.client.patch(
            "/api/users/{0}/".format(self.user.pk), {"country": new_country}
        )

        new_address = "New address Name"
        resp = self.client.patch(
            "/api/users/{0}/".format(self.user.pk), {"address": new_address}
        )

        assert (
            resp.status_code == 200
        ), "A logged in user should be able to do a partial update."
        assert resp.data.get(
            "phone") == new_phone, "The new phone number should be set"
        assert resp.data.get(
            "email") == new_email, "The new email should be set"
        assert (
            resp.data.get("company") == new_company
        ), "The new company name should be set"
        assert (
            resp.data.get("country") == new_country
        ), "The new country name should be set"
        assert (
            resp.data.get("address") == new_address
        ), "The new address name should be set"

    def test_non_staff_destroy(self):
        # user we are going to delete
        user1 = mixer.blend("users.CustomUser", phone="+31640708402")
        self.client.force_authenticate(self.user)

        assert self.user.is_admin is False, "We don't want extra permissions"
        assert self.user.is_staff is False, "We don't want extra permissions"
        assert self.user.is_superuser is False, "We don't want extra permissions"

        resp = self.client.delete("/api/users/{0}/".format(user1.pk))

        assert (
            resp.status_code == 403
        ), "Only a staff member should be authorized to delete another user."


class TestUsersViewStaff(APITestCase):
    def setUp(self):
        self.user = mixer.blend(
            "users.CustomUser", is_staff=True, is_active=True, phone="+35239802611"
        )
        self.client.force_authenticate(self.user)

    def test_staff_list(self):

        assert self.user.is_admin is False, "We want only a staff, not admin member."
        assert self.user.is_staff is True, "We want staff member permissions."
        assert self.user.is_superuser is False, "We want only a staff, not superuser member."

        resp = self.client.get("/api/users/")

        assert (
            resp.status_code == 200
        ), "Staff members should be able to see the user list."

    def test_staff_destroy(self):
        # user we are going to delete
        user1 = mixer.blend("users.CustomUser", phone="+31640708402")

        assert self.user.is_admin is False, "We want only a staff, not admin member."
        assert self.user.is_staff is True, "We want staff member permissions."
        assert self.user.is_superuser is False, "We want only a staff, not superuser member."

        resp = self.client.delete("/api/users/{0}/".format(user1.pk))

        assert (
            resp.status_code == 204
        ), "A staff member should be able to delete another user."
