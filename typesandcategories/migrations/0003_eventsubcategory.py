# Generated by Django 3.1.2 on 2020-10-29 02:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('typesandcategories', '0002_eventcategory'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventSubCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('description', models.TextField()),
                ('ecategory', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='typesandcategories.eventcategory')),
                ('etype', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='typesandcategories.eventtype')),
            ],
            options={
                'verbose_name': 'Event Subcategory',
                'verbose_name_plural': 'Event Subcategories',
            },
        ),
    ]