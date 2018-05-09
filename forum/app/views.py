# TODO: ajax request if username already exists
# TODO: after first login show template with notification in profile to add data about user
# TODO: template about email confirmaion
# TODO: render template message about email confirmation


from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from app.models import Category
from app.serializers import CategorySerializer
from rest_framework import generics
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate

from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.contrib.auth.models import User
from django.core.mail import EmailMessage

from . import models
from .forms import SignupForm
from .tokens import account_activation_token
from .utils import collect_threads_info


def threads_view(request):
    # /api/threads
    print(request)
    return JsonResponse(collect_threads_info(), safe=False)

@csrf_exempt
def register(request):
    # /register/
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
    # /activate
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

class CategoryListCreate(generics.ListCreateAPIView):
    # /api/category
    queryset = Category.objects.all()
    serializer_class = CategorySerializer