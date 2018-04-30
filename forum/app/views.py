from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from app.models import Category
from app.serializers import CategorySerializer
from rest_framework import generics

from . import models

class CategoryListCreate(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    # def list(self, request):
    #     # Note the use of `get_queryset()` instead of `self.queryset`
    #     queryset = self.get_queryset()
    #     serializer = CategorySerializer(queryset, many=True)
    #     return Response(serializer.data)



# from app import models
# from django.http import JsonResponse

def collect_threads_info():
    threads_info = []

    threads = models.ThreadTheme.objects.all()

    for theme in threads:
        thread_details = dict()
    
        thread_comments = models.CommentMeta.objects.filter(thread_id = theme.entity_id).order_by('created_at')
        category = models.Category.objects.filter(id = theme.category_id).first().category_name
        number_of_replies = thread_comments.count()
        author_username = models.User.objects.filter(id = theme.user_id).first().username
        author_avatar = str(models.Profile.objects.filter(user_id = theme.user_id).first().avatar)
    
        last_commented_username = ''
        last_commented_avatar = ''
        last_commented_date = ''
        if number_of_replies != 0:
            last_commented_date = thread_comments.last().created_at
            last_commented_username = models.User.objects.filter(id = thread_comments.last().creator_id).first().username
            last_commented_avatar = str(models.Profile.objects.filter(user_id = thread_comments.last().creator_id).first().avatar)
        
        
        thread_details['last_commented_avatar'] = last_commented_avatar
        thread_details['last_commented_username'] = last_commented_username
        thread_details['last_commented_date'] = last_commented_date
        thread_details['author_avatar'] = author_avatar
        thread_details['author_username'] = author_username
        thread_details['number_of_replies'] = number_of_replies
        thread_details['category'] = category
        
        thread_details['creation_date'] = theme.created_at
        thread_details['subject'] = theme.subject
        thread_details['content'] = theme.content
    
        threads_info.append(thread_details)
    
    return threads_info

def threads_view(request):
    print(request)
    return JsonResponse(collect_threads_info(), safe=False)