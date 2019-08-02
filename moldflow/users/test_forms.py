from django.contrib.auth import get_user_model
from django.test import TestCase

from .forms import CustomUserChangeForm
from .models import CustomUser


class UserChangeTests(TestCase):
    def setUp(self):
        user = get_user_model().objects.create_user(
            email='test@example.com',
            password='testingpassword123',
            phone='+31649802702',
            company='Shell',
            country='Netherlands',
            address='sample address',
        )

    def test_valid_data(self):
        """
        Test if a good change form would be valid
        """
        form = CustomUserChangeForm(
            {'email': 'leela@example.com',
             'phone': '+31598682506',
             'company': 'sample company name',
             'country': 'NL',
             'address': 'sample address'})
        self.assertTrue(form.is_valid())
        change_form = form.save()

        self.assertEqual(change_form.email, 'leela@example.com')
        self.assertEqual(change_form.phone, '+31598682506')
        self.assertEqual(change_form.company, 'sample company name')
        self.assertEqual(change_form.country, 'NL')
        self.assertEqual(change_form.address, 'sample address')
