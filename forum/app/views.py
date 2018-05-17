# TODO: if username or email exists
# TODO: ajax request if username already exists
# TODO: after first login show template with notification in profile to add data about user

import jwt
import json

from rest_framework.response import Response
from rest_framework import generics

from rest_framework import status, exceptions
from rest_framework.authentication import get_authorization_header, BaseAuthentication
from rest_framework import views

from django.http import HttpResponse, JsonResponse
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
from .utils import collect_threads_info, get_thread
from app.models import Category
from app.serializers import CategorySerializer


class Login(views.APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        if not request.data:
            return Response({'Error': "Please provide username/password"}, status="400")
        
        username = request.data['username']
        password = request.data['password']
        print(username, password)
        # try:
        #     print('trying to find user in db...')
        #     # user = User.objects.get(username=username, password=password)
        #     user = authenticate(username=username, password=password)
        # except User.DoesNotExist:
        #     return Response({'Error': "Invalid username/password"}, status="400")
        user = authenticate(username=username, password=password)
        if user:
            payload = {
                'id': user.id,
                'email': user.email,
            }
            encoded_jwt = jwt.encode(payload, "SECRET_KEY")
            jwt_token = {'token': encoded_jwt.decode('utf-8')} 
            return HttpResponse(json.dumps(jwt_token), status=200, content_type="application/json")
        else:
            return Response({'Error': "Invalid username/password"}, status="400")
            # return JsonResponse({'Error': "Invalid credentials"},status=400)


class TokenAuthentication(BaseAuthentication):
    model = None

    def get_model(self):
        return User
        
    @csrf_exempt
    def authenticate(self, request):
        auth = get_authorization_header(request).split()

        if not auth or auth[0].lower() != b'bearer':
            return

        if len(auth) == 1:
            msg = 'Invalid token header. No credentials provided.'
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = 'Invalid token header'
            raise exceptions.AuthenticationFailed(msg)

        try:
            token = auth[1]
            print(token)
            if token == "null":
                msg = 'Null token not allowed'
                raise exceptions.AuthenticationFailed(msg)
        except UnicodeError:
            msg = 'Invalid token header. Token string should not contain invalid characters.'
            raise exceptions.AuthenticationFailed(msg)

        return self.authenticate_credentials(token)

    def authenticate_credentials(self, token):
        model = self.get_model()
        payload = jwt.decode(token, "SECRET_KEY")
        email = payload['email']
        userid = payload['id']
        msg = {'Error': "Token mismatch",'status' :"401"}
        try:
            
            user = User.objects.get(
                email=email,
                id=userid,
                is_active=True
            )
            # print('ЩА НАВЕРНОЕ БУИТ ОШИБКА')
            # print(user)
            # if not user.token['token'] == token:
                # raise exceptions.AuthenticationFailed(msg)
              
        except jwt.ExpiredSignature or jwt.DecodeError or jwt.InvalidTokenError:
            return HttpResponse({'Error': "Token is invalid"}, status="403")
        except User.DoesNotExist:
            return HttpResponse({'Error': "Internal server error"}, status="500")
        if user:
            return user, token



class Thread(views.APIView):
    @csrf_exempt
    def post(self, request):
        Auth = TokenAuthentication()
        res = Auth.authenticate(request)
        if res:
            user, token = res
            category = models.Category.objects.get(category_name = request.POST.get('category'))
            if category:
                entity = models.Entity()
                entity.save()
                thread = models.ThreadTheme(entity=entity, subject=request.POST.get('subject'),\
                    content=request.POST.get('content'), user = user, category = category)
                thread.save()
                return HttpResponse(status=200)
        else:
            return HttpResponse(status=400)
    
    def get(self, request, thread_id, data=False):

        if(not data):
            return render(request, 'frontend/thread.html')

        else:
            thread_id = int(thread_id.split('t')[1])

            theme = models.ThreadTheme.objects.filter(entity_id=thread_id).first()
            if theme:
  
                info = get_thread(theme)

                return JsonResponse(info, safe=False)

        return HttpResponse(status=400)


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
            message = render_to_string('email_confirm_template.html', {
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
            return JsonResponse({'url': '/verify'})
            # return HttpResponse('Please confirm your email address to complete the registration')
            # return render(request, 'email_message_redirect.html',{'email': to_email})
        else:
            resp = 'Something went wrong'
            return JsonResponse(resp, safe=False, stutus=400)
    else:
        # TODO: render same form
        # form = SignupForm()
        resp = 'Method Not Allowed'
        return JsonResponse(resp, status=405, safe=False)
    return JsonResponse({'you':'registered'}) # render(request, 'signup.html', {'form': form})

def verify(request):
    return render(request, 'email_message_redirect.html')

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