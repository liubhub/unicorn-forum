from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    bio = models.CharField(max_length=200, blank=True, null=True)
    birth_date = models.DateField(null=True, blank=True)
    city = models.CharField(max_length=25, null=True, blank=False)
    country = models.CharField(max_length=25, null=True, blank=False)
    avatar = models.FileField(upload_to="avatars/", null=True, blank=True)  # MEDIA_ROOT/avatars
    updated_at = models.DateTimeField(auto_now=True)  # last modified his profile
    confirmed = models.BooleanField(null=False, blank=False, default=0)

    class Meta():
        db_table = 'user_profile'

    def is_user_confirmed(self):
        return self.confirmed

class Category(models.Model):
    id = models.BigAutoField(primary_key=True)
    category_name = models.CharField(max_length=255, unique=True, null=False,blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta():
        db_table = 'category'

    def __str__(self):
        return self.category_name

class Message(models.Model):
    id = models.BigAutoField(primary_key=True)
    message_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta():
        db_table = "message"

    def __str__(self):
        return self.id

class MessageRecipient(models.Model):
    id = models.BigAutoField(primary_key=True)
    message = models.ForeignKey(Message, on_delete=models.CASCADE)
    read_status = models.BooleanField()
    message_recipient = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta():
        db_table = "message_recipient"
    
    def __str__(self):
        return self.id

class Entity(models.Model):
    id = models.BigAutoField(primary_key=True)

    class Meta():
        db_table = "entity"
    
    def __str__(self):
        return self.id

class Avatar(models.Model):
    entity = models.OneToOneField(Entity, on_delete=models.CASCADE, primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta():
        db_table = "avatar"
    
    def __str__(self):
        return self.entity


class ThreadTheme(models.Model):
    entity = models.OneToOneField(Entity, on_delete=models.CASCADE, primary_key=True)
    category = models.ForeignKey(Category, on_delete=models.deletion.SET_NULL, null=True)
    subject = models.CharField(max_length = 75, null=False, blank=False)
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta():
        db_table = "thread_theme"
    
    def __str__(self):
        # return str(self.entity) + ", " + str(self.subject)
        return self.subject

class Comment(models.Model):
    entity = models.OneToOneField(Entity, on_delete=models.CASCADE, primary_key=True)
    content = models.TextField()
    # created_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateField(auto_now=True)

    class Meta():
        db_table = "comment"
    
    # def __str__(self):
    #     return self.entity

class CommentMeta(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name="main_comment_ref")
    creator = models.ForeignKey(User, on_delete=models.deletion.SET_NULL, related_name="creator_of_comment", null=True)
    answer_to = models.ForeignKey(User, on_delete=models.deletion.SET_NULL, related_name="answer_to_comment", null=True)
    answer_to_comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name="answered_to_comment_ref",null=True)
    thread = models.ForeignKey(ThreadTheme, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    class Meta():
        db_table = "comment_meta_info"
    
    # def __str__(self):
    #     return self.comment

class LikedEntity(models.Model):
    id = models.BigAutoField(primary_key=True)
    entity = models.OneToOneField(Entity, on_delete=models.CASCADE)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    class Meta():
        db_table = "liked_entity"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
