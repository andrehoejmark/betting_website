# Generated by Django 3.1.7 on 2021-03-06 13:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_myuser_bank_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='about_me',
            field=models.TextField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='myuser',
            name='city',
            field=models.CharField(blank=True, default=None, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='myuser',
            name='country',
            field=models.CharField(blank=True, default=None, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='myuser',
            name='country_code',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='myuser',
            name='date_of_birth',
            field=models.DateField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='myuser',
            name='gender',
            field=models.CharField(blank=True, choices=[('F', 'Female'), ('M', 'Male')], default=None, max_length=3, null=True),
        ),
        migrations.AddField(
            model_name='myuser',
            name='phone_number',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='myuser',
            name='phone_number_verified',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='myuser',
            name='profile_image',
            field=models.ImageField(null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='myuser',
            name='street',
            field=models.CharField(blank=True, default=None, max_length=250, null=True),
        ),
    ]
