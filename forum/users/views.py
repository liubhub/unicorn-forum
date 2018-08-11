# TODO: ajax request if username already exists
# TODO: if submit incorrect return same data in form
# TODO: after first login show template with notification in profile to add data about user

import jwt
import json

from django.views.decorators.csrf import csrf_exempt

from rest_framework.response import Response
from rest_framework import status, exceptions
from rest_framework.authentication import get_authorization_header, BaseAuthentication
from rest_framework import views

from django.http import HttpResponse

from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.contrib.auth import login, authenticate
from django.core.mail import EmailMessage
from django.contrib.auth.models import User


from .tokens import account_activation_token

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
            message = render_to_string('email_confirm_template.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)).decode(), 
                'token':account_activation_token.make_token(user),
            })
            to_email = form.cleaned_data.get('email')
            email = EmailMessage(
                        mail_subject, message, to=[to_email] 
            )
            email.send()
            return JsonResponse({'url': '/verify'})
        
        else:
            resp = 'Something went wrong'
            return JsonResponse(resp, safe=False, stutus=400)
    else:
        # TODO: render same form
        resp = 'Method Not Allowed'
        return JsonResponse(resp, status=405, safe=False)
    return JsonResponse({'you':'registered'}) 

def verify(request):
    # TODO: render only once
    return render(request, 'email_message_redirect.html')

def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        return HttpResponse('Thank you for your email confirmation. Now you can login your account.')
    else:
        return HttpResponse('Activation link is invalid!')

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
              
        except jwt.ExpiredSignature or jwt.DecodeError or jwt.InvalidTokenError:
            return HttpResponse({'Error': "Token is invalid"}, status="403")
        except User.DoesNotExist:
            return HttpResponse({'Error': "Internal server error"}, status="500")
        if user:
            return user, token

class Login(views.APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        if not request.data:
            return Response({'Error': "Please provide username/password"}, status="400")
        
        username = request.data['username']
        password = request.data['password']
        
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