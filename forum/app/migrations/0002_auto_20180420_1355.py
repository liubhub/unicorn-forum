# Generated by Django 2.0.4 on 2018-04-20 10:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='avatar',
            old_name='entity_id',
            new_name='entity',
        ),
        migrations.RenameField(
            model_name='avatar',
            old_name='user_id',
            new_name='user',
        ),
        migrations.RenameField(
            model_name='comment',
            old_name='entity_id',
            new_name='entity',
        ),
        migrations.RenameField(
            model_name='commentmeta',
            old_name='answer_to_id',
            new_name='answer_to',
        ),
        migrations.RenameField(
            model_name='commentmeta',
            old_name='comment_id',
            new_name='comment',
        ),
        migrations.RenameField(
            model_name='commentmeta',
            old_name='creator_id',
            new_name='creator',
        ),
        migrations.RenameField(
            model_name='commentmeta',
            old_name='thread_id',
            new_name='thread',
        ),
        migrations.RenameField(
            model_name='likedentity',
            old_name='entity_id',
            new_name='entity',
        ),
        migrations.RenameField(
            model_name='likedentity',
            old_name='user_id',
            new_name='user',
        ),
        migrations.RenameField(
            model_name='message',
            old_name='creator_id',
            new_name='creator',
        ),
        migrations.RenameField(
            model_name='messagerecipient',
            old_name='message_id',
            new_name='message',
        ),
        migrations.RenameField(
            model_name='messagerecipient',
            old_name='message_recipient_id',
            new_name='message_recipient',
        ),
        migrations.RenameField(
            model_name='threadtheme',
            old_name='category_id',
            new_name='category',
        ),
        migrations.RenameField(
            model_name='threadtheme',
            old_name='entity_id',
            new_name='entity',
        ),
        migrations.RenameField(
            model_name='threadtheme',
            old_name='user_id',
            new_name='user',
        ),
    ]