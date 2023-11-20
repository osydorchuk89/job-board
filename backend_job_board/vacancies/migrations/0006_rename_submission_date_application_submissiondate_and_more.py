# Generated by Django 4.2.6 on 2023-11-02 17:44

from django.db import migrations, models
import vacancies.models


class Migration(migrations.Migration):
    dependencies = [
        ("vacancies", "0005_alter_vacancy_recruiter"),
    ]

    operations = [
        migrations.RenameField(
            model_name="application",
            old_name="submission_date",
            new_name="submissionDate",
        ),
        migrations.RenameField(
            model_name="vacancy",
            old_name="about_company",
            new_name="aboutCompany",
        ),
        migrations.RenameField(
            model_name="vacancy",
            old_name="employment_type",
            new_name="employmentType",
        ),
        migrations.RenameField(
            model_name="vacancy",
            old_name="key_responsibilities",
            new_name="keyResponsibilities",
        ),
        migrations.RenameField(
            model_name="vacancy",
            old_name="position_overview",
            new_name="positionOverview",
        ),
        migrations.RenameField(
            model_name="vacancy",
            old_name="posting_date",
            new_name="postingDate",
        ),
        migrations.RemoveField(
            model_name="vacancy",
            name="work_mode",
        ),
        migrations.AddField(
            model_name="application",
            name="applicantEmail",
            field=models.EmailField(default="email@email.com", max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="application",
            name="applicantName",
            field=models.CharField(default="John Doe", max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="application",
            name="applicantPhone",
            field=models.CharField(max_length=15, blank=True, null=True),
        ),
        migrations.AddField(
            model_name="application",
            name="motivationLetter",
            field=models.FileField(blank=True, null=True, upload_to=vacancies.models.get_upload_path),
        ),
        migrations.AddField(
            model_name="vacancy",
            name="workMode",
            field=models.CharField(
                choices=[("On-Site", "On-Site"), ("Remote", "Remote"), ("Hybrid", "Hybrid"), ("Flexible", "Flexible")],
                default="Full Time",
                max_length=100,
            ),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="application",
            name="cv",
            field=models.FileField(upload_to=vacancies.models.get_upload_path),
        ),
    ]
