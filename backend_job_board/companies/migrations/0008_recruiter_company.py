# Generated by Django 4.2.6 on 2023-11-10 08:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0007_alter_recruiter_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='recruiter',
            name='company',
            field=models.CharField(default='Cool Company', max_length=100),
            preserve_default=False,
        ),
    ]
