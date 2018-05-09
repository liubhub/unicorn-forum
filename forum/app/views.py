# TODO: ajax request if username already exists
# TODO: after first login show template with notification in profile to add data about user
# TODO: template about email confirmaion

from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from app.models import Category
from app.serializers import CategorySerializer
from rest_framework import generics

from django.views.decorators.csrf import csrf_exempt


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

########    registration form with email

from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from .forms import SignupForm
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from .tokens import account_activation_token
from django.contrib.auth.models import User
from django.core.mail import EmailMessage

from django.core.mail import send_mail


@csrf_exempt
def register(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            current_site = get_current_site(request)
            mail_subject = 'Activate your account.'
            message = render_to_string('email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)).decode(), #urlsafe_base64_encode(force_bytes(user.pk)),
                'token':account_activation_token.make_token(user),
            })
            to_email = form.cleaned_data.get('email')
            email = EmailMessage(
                        mail_subject, message, to=[to_email] #fail_silently=False
            )
            email.send()
            return HttpResponse('Please confirm your email address to complete the registration')
    else:
        # form = SignupForm()
        resp = 'Method Not Allowed'
        return JsonResponse(resp, status=405, safe=False)
    return JsonResponse({'you':'registered'}) # render(request, 'signup.html', {'form': form})

def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        # login(request, user)
        # return redirect('home')
        return HttpResponse('Thank you for your email confirmation. Now you can login your account.')
    else:
        return HttpResponse('Activation link is invalid!')




# @csrf_exempt
# def register(request):
#     if request.method == 'POST':
#         # TODO: render template message about email confirmation
#         # debug only
#         print(request.POST)
#     else:
    #     resp = 'Method Not Allowed'
    #     return JsonResponse(resp, status=405, safe=False)
    # return JsonResponse({'hello': 'world'})




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