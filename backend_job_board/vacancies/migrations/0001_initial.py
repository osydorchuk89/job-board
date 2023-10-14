# Generated by Django 4.2.6 on 2023-10-14 06:56

from django.db import migrations, models
import django.db.models.deletion
import vacancies.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('companies', '0001_initial'),
        ('candidates', '0002_alter_candidate_cv'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vacancy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('location_city', models.CharField(blank=True, max_length=100, null=True)),
                ('location_country', models.CharField(blank=True, max_length=100, null=True)),
                ('description', models.TextField()),
                ('salary', models.IntegerField(blank=True, null=True)),
                ('industry', models.CharField(max_length=100)),
                ('employment_type', models.CharField(choices=[('Full Time', 'Full Time'), ('Part Time', 'Part Time'), ('Contract', 'Contract'), ('Temporary', 'Temporary'), ('Freelance', 'Freelance'), ('Internship', 'Internship')], max_length=100)),
                ('work_mode', models.CharField(choices=[('On-site', 'On-site'), ('Remote', 'Remote'), ('Hybrid', 'Hybrid'), ('Flexible', 'Flexible')], max_length=100)),
                ('posting_date', models.DateField(auto_now_add=True)),
                ('slug', models.SlugField(max_length=100)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vacancy_company', to='companies.company')),
                ('recruiter', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='vacancy_recruiter', to='companies.recruiter')),
            ],
            options={
                'verbose_name_plural': 'Vacancies',
            },
        ),
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cv', models.FileField(blank=True, null=True, upload_to=vacancies.models.get_upload_path)),
                ('submission_date', models.DateTimeField(auto_now_add=True)),
                ('applicant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='application_candidate', to='candidates.candidate')),
                ('vacancy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='application_vacancy', to='vacancies.vacancy')),
            ],
        ),
    ]
