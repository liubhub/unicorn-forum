from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from app.models import Category
from app.serializers import CategorySerializer
from rest_framework import generics


from . import models

class CategoryListCreate(generics.ListCreateAPIView):
    # /api/category
    queryset = Category.objects.all()
    serializer_class = CategorySerializer



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
    # /api/threads
    print(request)
    return JsonResponse(collect_threads_info(), safe=False)


from django.views.decorators.csrf import csrf_protect
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt

# @csrf_protect
# @ensure_csrf_cookie
@csrf_exempt
def register(request):
    if request.method == 'POST':
        print('Post')
        print(request.POST)
        print(request)
    else:
        print('Get')
        print(request.GET)
        #print(request.data)
    
    return JsonResponse({'hello': 'world'})




# from django.shortcuts import render
# from django.contrib.auth.models import User
# from django.contrib.auth import authenticate, login
# from django.http import HttpResponseRedirect
# from django import forms

# from .forms import UserRegistrationForm

# def register(request):
#     if request.method == 'POST':
#         form = UserRegistrationForm(request.POST)
#         if form.is_valid():
#             userObj = form.cleaned_data
#             username = userObj['username']
#             email =  userObj['email']
#             password =  userObj['password']
#             if not (User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists()):
#                 User.objects.create_user(username, email, password)
#                 user = authenticate(username = username, password = password)
#                 login(request, user)
#                 return HttpResponseRedirect('/')
#             else:
#                 raise forms.ValidationError('Looks like a username with that email or password already exists')
#     else:
#         form = UserRegistrationForm()
#     return render(request, 'frontend/register.html', {'form' : form})