# Generated by Django 4.2.6 on 2023-11-04 18:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vacancies', '0008_alter_application_applicant_phone'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='application',
            name='applicant_email',
        ),
        migrations.RemoveField(
            model_name='application',
            name='applicant_name',
        ),
        migrations.RemoveField(
            model_name='application',
            name='applicant_phone',
        ),
    ]
