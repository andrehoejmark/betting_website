from django.db import models
from bankid import BankIDJSONClient

# inspiration https://github.com/SaipranavK/Swedish-BankID-Authentication-with-django/blob/main/bankid_sign/views.py



class TypeOfAuthentication(models.TextChoices):
        Empty = 'Non', ('Empty')
        Registration = 'REG', ('Registration')
        PayIn = 'PI', ('Purchase')
        Payout = 'PO', ('Payout')


class BankIDAuthentication(models.Model):

    order_ref = models.CharField(primary_key=True, max_length=255, default=None)
    accepted_at = models.DateTimeField(null=True, blank=True, default=None)
    type_of_authentication = models.CharField(
        max_length=3,
        choices = TypeOfAuthentication.choices,
        default=None,
    )


