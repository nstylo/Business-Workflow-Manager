from django.contrib.auth import get_user_model
from django.test import TestCase


class CustomUserManagerTests(TestCase):
    """
    Test for regular user manager
    """
    def setUp(self):
        self.User = get_user_model()
        self.user = self.User.objects.create_user(
            email="test@example.com",
            company="Shell",
            country="Netherlands",
            address="sample address",
            phone="+31649802702",
            password="testingpassword",
        )

    def assertPermissions(
            self, *, is_staff=False, is_superuser=False, is_admin=False
    ):
        self.assertEqual(self.user.is_staff, is_staff)
        self.assertEqual(self.user.is_superuser, is_superuser)
        self.assertEqual(self.user.is_admin, is_admin)

    def test_is_active(self):
        self.assertFalse(self.user.is_active)

    def test_no_username(self):
        try:
            # no usernames get created for our user model
            self.assertIsNone(self.user.username)
        except AttributeError:
            pass

    def test_no_permissions_on_default_account(self):
        self.assertPermissions(
            is_staff=False, is_superuser=False, is_admin=False)

    # test for empty entries below
    def test_no_email(self):
        self.user.email = ''
        self.user.save()

        self.assertEqual(self.user.email, '')

    def test_no_password(self):
        self.user.password = ''
        self.user.save()

        self.assertEqual(self.user.password, '')

    def test_no_phone(self):
        self.user.phone = ''
        self.user.save()

        self.assertEqual(self.user.phone, '')

    def test_no_company(self):
        self.user.company = ''
        self.user.save()

        self.assertEqual(self.user.company, '')

    def test_no_country(self):
        self.user.country = ''
        self.user.save()

        self.assertEqual(self.user.country, '')

    def test_no_address(self):
        self.user.address = ''
        self.user.save()

        self.assertEqual(self.user.address, '')


class CustomSuperUserManagerTests(TestCase):
    """
    Test custom super user manager
    """

    def setUp(self):
        self.User = get_user_model()
        self.user = self.User.objects.create_superuser(
            email="test@example.com",
            company="Shell",
            country="Netherlands",
            address="sample address",
            phone="+31647802691",
            password="testingpassw123.",
        )

    # TODO: Change from True to False when emailing is done
    def test_is_active(self):
        self.assertTrue(self.user.is_active)

    def assertPermissions(
            self, *, is_staff=True, is_superuser=True, is_admin=True
    ):
        self.assertEqual(self.user.is_staff, is_staff)
        self.assertEqual(self.user.is_superuser, is_superuser)
        self.assertEqual(self.user.is_admin, is_admin)

    def test_no_username(self):
        try:
            # no usernames get created for our user model
            self.assertIsNone(self.user.username)
        except AttributeError:
            pass

    def test_no_permissions_on_default_account(self):
        self.assertPermissions(is_staff=True, is_superuser=True, is_admin=True)

    # test for empty entries below
    def test_no_email(self):
        self.user.email = ''
        self.user.save()

        self.assertEqual(self.user.email, '')

    def test_no_password(self):
        self.user.password = ''
        self.user.save()

        self.assertEqual(self.user.password, '')

    def test_no_phone(self):
        self.user.phone = ''
        self.user.save()

        self.assertEqual(self.user.phone, '')

    def test_no_company(self):
        self.user.company = ''
        self.user.save()

        self.assertEqual(self.user.company, '')

    def test_no_country(self):
        self.user.country = ''
        self.user.save()

        self.assertEqual(self.user.country, '')

    def test_no_address(self):
        self.user.address = ''
        self.user.save()

        self.assertEqual(self.user.address, '')
