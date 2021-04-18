from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractUser
#from bankID.models import BankIDAuthentication


class Genders(models.TextChoices):
        Female = 'F', ('Female')
        Male = 'M', ('Male')

class MyUser(AbstractUser):
    # Identificaiton
    first_name = models.CharField(max_length=100, default=None, blank=True, null=True)
    last_name = models.CharField(max_length=100, default=None, blank=True, null=True)
    
    # Swedish identification
    #bank_id = models.ForeignKey(BankIDAuthentication, on_delete=models.CASCADE, default=None, blank=True, null=True)
    
    street = models.CharField(max_length=250, default=None, blank=True, null=True)
    city = models.CharField(max_length=250, default=None, blank=True, null=True)
    country = models.CharField(max_length=250, default=None, blank=True, null=True)
    country_code = models.IntegerField(default=None, blank=True, null=True)

    phone_number_verified = models.BooleanField(default=False)
    phone_number = models.IntegerField(default=None, blank=True, null=True)

    date_of_birth = models.DateField(default=None, blank=True, null=True)

    gender = models.CharField(
        max_length=3,
        choices=Genders.choices,
        default=None,
        blank=True,
        null=True
    )

    about_me = models.TextField(max_length=500, blank=True, null=True)
    profile_image = models.ImageField(null=True)
    

