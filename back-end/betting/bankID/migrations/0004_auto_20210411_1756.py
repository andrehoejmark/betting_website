# Generated by Django 3.2 on 2021-04-11 15:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bankID', '0003_bankidauthentication_p_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='bankidauthentication',
            name='ip_address',
            field=models.CharField(blank=True, default=None, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='bankidauthentication',
            name='ocspResponse',
            field=models.TextField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='bankidauthentication',
            name='signature',
            field=models.TextField(blank=True, default=None, null=True),
        ),
    ]
