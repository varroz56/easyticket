# Generated by Django 3.1.2 on 2020-10-29 01:54

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_userprofile_premium_until'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='premium_until',
            field=models.DateField(default=datetime.date(2020, 10, 28)),
        ),
    ]