from django.db import models

class User(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.TextField(max_length=30,null=True, blank=False)
    sirname = models.TextField(max_length=30, null=True, blank=False)
    login = models.TextField(max_length=25, null=False, unique=True)
    password = models.CharField(max_length=128, null=False, blank=False)
    email = models.TextField(max_length=25, null=False, blank=False, unique=True)
    city = models.TextField(max_length=25, null=True, blank=False)
    country = models.TextField(max_length=25, null=True, blank=False)
    avatar = models.TextField(max_length=25,null=True, blank=False) # link to the avatar image at the special folder
    last_seen_at = models.DateTimeField() # make this update when user logs out
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) # last modified his profile
    confirmed = models.BooleanField(null=False, blank=False)
    is_admin = models.BooleanField(null=False,blank=False)
    
    def is_user_confirmed(self):
        return self.confirmed
    
    def __str__(self):
        return self.login



