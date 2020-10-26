# Generated by Django 3.1.2 on 2020-10-26 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='HowTo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=254)),
                ('answer', models.TextField()),
                ('number_of_views', models.IntegerField(default=1)),
            ],
        ),
    ]
