# Generated by Django 2.2.3 on 2019-08-04 20:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0003_auto_20190804_1605'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='job',
            options={'ordering': ['created'], 'verbose_name': 'job', 'verbose_name_plural': 'jobs'},
        ),
    ]
