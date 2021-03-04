'''
from django.contrib.auth import get_user_model
from django import forms
from .models import User
from django.db import models
#from allauth.account.forms import SignupForm

class MyCustomSignupForm(forms.Form):

    first_name = forms.CharField(label="first_name")
    last_name = forms.CharField(label="last_name")

    class Meta:
        model = User
        fields = ('email', 'first_name')


    def custom_signup(self, request, user):
        
        print('cats1')
        user = super(MyCustomSignupForm, self).save(request)
        print('cats2')
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        print('cats3')
        user.save()
        print('cats4')
        return user

    def signup(self, request, user):
        
        print('cats1')
        user = super(MyCustomSignupForm, self).save(request)
        print('cats2')
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        print('cats3')
        user.save()
        print('cats4')
        return {"cat"}#user
'''

from allauth.account.forms import SignupForm, LoginForm
from django.core.validators import RegexValidator
from django import forms

class MyCustomSignupForm(SignupForm):
    def __init__(self,*args,**kwargs):
        super(MyCustomSignupForm,self).__init__(*args,**kwargs)

    first_name = forms.CharField(max_length = 100, label = 'Fullname')
    last_name = forms.CharField(max_length = 100)

    def save(self, request):
        user = super(MyCustomSignupForm, self).save(request)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.save()
        return user