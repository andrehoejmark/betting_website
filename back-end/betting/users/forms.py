from django import forms
from allauth.account.forms import SignupForm
#from .models import User


class SignupForm(SignupForm):


    first_name = forms.CharField(max_length=30)
    last_name = forms.CharField(max_length=30)

    
    def save(self, request):
        
        # Ensure you call the parent class's save.
        # .save() returns a User object.
        user = super(SignupForm, self).save(request)
        
        # Add your own processing here.
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']

        user.save()
        return user


'''
class SignupForm(forms.Form):
    first_name = forms.CharField(max_length=30, label='Voornaam')
    last_name = forms.CharField(max_length=30, label='Achternaam')

    def signup(self, request, user):
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.save()
'''
