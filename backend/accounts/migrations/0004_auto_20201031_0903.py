# Generated by Django 3.1.2 on 2020-10-31 09:03

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_auto_20201029_0154'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='premium_until',
            field=models.DateField(default=datetime.date(2020, 10, 30)),
        ),
    ]
