from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    # id = models.BigIntegerField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    # username1 = models.TextField(max_length=30, null=False, unique=True)
    bio = models.TextField(max_length=200, blank=True, null=True)
    birth_date = models.DateField(null=True, blank=True)
    city = models.TextField(max_length=25, null=True, blank=False)
    country = models.TextField(max_length=25, null=True, blank=False)
    avatar = models.TextField(max_length=25,null=True, blank=False)# TODO: FileField # link to the avatar image at the special folder
    updated_at = models.DateTimeField(auto_now=True) # last modified his profile
    confirmed = models.BooleanField(null=False, blank=False)

    class Meta():
        db_table = 'user_profile'

    def is_user_confirmed(self):
        return self.confirmed
    
    # def __str__(self):
    #     return self.username
    
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()