from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from bankID.models import BankIDAuthentication
from django.utils import timezone
from django.conf import settings


class UserManager(BaseUserManager):

  def _create_user(self, email, password, is_staff, is_superuser, **extra_fields):
    if not email:
        raise ValueError('Users must have an email address')
    now = timezone.now()
    email = self.normalize_email(email)
    user = self.model(
        email=email,
        is_staff=is_staff, 
        is_active=True,
        is_superuser=is_superuser, 
        last_login=now,
        date_joined=now,
        **extra_fields
    )
    user.set_password(password)
    user.save(using=self._db)
    return user

  def create_user(self, email, password, **extra_fields):
    return self._create_user(email, password, False, False, **extra_fields)

  def create_superuser(self, email, password, **extra_fields):
    user=self._create_user(email, password, True, True, **extra_fields)
    user.save(using=self._db)
    return user



class Genders(models.TextChoices):
        Female = 'F', ('Female')
        Male = 'M', ('Male')


class User(AbstractBaseUser):

    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(max_length=254, unique=True)
    name = models.CharField(max_length=254, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    bank_id = models.ForeignKey(BankIDAuthentication, on_delete=models.CASCADE, default=None, blank=True, null=True)
    
    # Personal Information
    first_name = models.CharField(max_length=150, default=None, blank=True, null=True)
    last_name = models.CharField(max_length=150, default=None, blank=True, null=True)

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

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects = UserManager()

    def get_absolute_url(self):
        return "/users/%i/" % (self.pk)
