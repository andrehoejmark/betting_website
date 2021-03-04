from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractUser


class MyUser(AbstractUser):
    first_name = models.CharField(max_length=100, default=None, blank=True, null=True)
    last_name = models.CharField(max_length=100, default=None, blank=True, null=True)
    cats = models.CharField(max_length=100, default=None, blank=True, null=True)


