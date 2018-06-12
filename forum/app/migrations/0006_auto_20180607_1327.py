# Generated by Django 2.0 on 2018-06-07 10:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_auto_20180501_0021'),
    ]

    operations = [
        migrations.AlterField(
            model_name='likedentity',
            name='entity',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Entity'),
        ),
        migrations.AlterField(
            model_name='likedentity',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]