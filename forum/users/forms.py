# from django.contrib.auth.models import User
# from django.db import transaction

from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class SignupForm(UserCreationForm):
    email = forms.EmailField(max_length=200, help_text='Required')
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')



# class UserRegistrationForm(forms.Form):
# 	username = forms.CharField(
# 			required = True,
# 			label = 'Username',
# 			max_length = 32
# 		)
# 	email = forms.CharField(
# 			required = True,
# 			label = 'Email',
# 			max_length = 32,
# 		)
# 	password = forms.CharField(
# 			required = True,
# 			label = 'Password',
# 			max_length = 32,
# 			widget = forms.PasswordInput()
# 		)

# from registration.forms import RegistrationForm

# class CustomRegistrationForm(RegistrationForm):
   
#     class Meta:
#         model = User
#         fields = ('username', 'email', 'password1', 'password2')
        
#     @transaction.atomic
#     def save(self, commit=True):
#         #with transaction.atomic():
#         user = super(CustomRegistrationForm, self).save()
#         user.refresh_from_db()  # very important! this will load the profile instance created by the signal
#         # user.profile.location = self.cleaned_data.get('location')
#         # set here all other values
#         user.save()
#         return user