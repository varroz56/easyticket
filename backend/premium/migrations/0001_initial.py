# Generated by Django 3.1.2 on 2020-10-27 12:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ShippingAddress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address_line_one', models.CharField(max_length=254)),
                ('address_line_two', models.CharField(max_length=254)),
                ('postcode', models.CharField(max_length=10)),
                ('city', models.CharField(max_length=100)),
                ('country', models.CharField(max_length=100)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Shipping Adresses',
            },
        ),
    ]
