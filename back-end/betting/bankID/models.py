from django.db import models
from bankid import BankIDJSONClient
from users.models import MyUser

# inspiration https://github.com/SaipranavK/Swedish-BankID-Authentication-with-django/blob/main/bankid_sign/views.py



class TypeOfAuthentication(models.TextChoices):
        Empty = 'Non', ('Empty')
        Registration = 'REG', ('Registration')
        PayIn = 'PI', ('Purchase')
        Payout = 'PO', ('Payout')


class BankIDAuthentication(models.Model):

    order_ref = models.CharField(primary_key=True, max_length=255, default=None)
    accepted_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    first_name = models.CharField(max_length=100, default=None, blank=True, null=True)
    last_name = models.CharField(max_length=100, default=None, blank=True, null=True)
    p_number = models.CharField(max_length=100, default=None, blank=True, null=True)
    ip_address = models.CharField(max_length=255, default=None, blank=True, null=True)
    signature = models.TextField(default=None, blank=True, null=True)
    ocspResponse = models.TextField(default=None, blank=True, null=True)


    account = models.ForeignKey(MyUser, on_delete=models.DO_NOTHING, default=None, blank=True, null=True)

    type_of_authentication = models.CharField(
        max_length=3,
        choices = TypeOfAuthentication.choices,
        default=None,
    )