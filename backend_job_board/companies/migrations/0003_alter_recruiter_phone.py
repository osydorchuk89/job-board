# Generated by Django 4.2.6 on 2025-05-24 12:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recruiter',
            name='phone',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]
