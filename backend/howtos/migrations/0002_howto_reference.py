# Generated by Django 3.1.2 on 2020-10-31 09:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('howtos', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='howto',
            name='reference',
            field=models.CharField(blank=True, max_length=10),
        ),
    ]
