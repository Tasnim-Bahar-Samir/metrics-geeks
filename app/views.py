from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login,authenticate
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.http import JsonResponse

# Create your views here.


def index(request):
    return render(request, 'index.html')

def signup(request):
    if request.method == 'POST':
        print(request.POST.get('first_name'))
        username = request.POST.get('username')
        email = request.POST.get('email')
        first_name = request.POST.get('first_name')
        password = request.POST.get('password1')  
        password2 = request.POST.get('password2')

        if password != password2:
            
            password_mismatch = True
            return render(request, 'index.html', {'password_mismatch': password_mismatch})
            

        try:
            # Try to create the user
            user = User.objects.create_user(username=username, password=password, first_name=first_name, email=email)
            user.save()
            return redirect('index')

        except IntegrityError as e:
            print(e)
            if 'unique constraint' in str(e):
                error_message = "The email or username already exists."
            else:
                error_message = "The email or username already exists."
            return JsonResponse({'error_message': error_message}, status=400)

    return render(request, 'index.html')

def Login(request):
    if request.method=='POST':
        username=request.POST.get('username')
        pass1=request.POST.get('login_password')
        user=authenticate(request,username=username,password=pass1)
        if user is not None:
            login(request,user)
            return JsonResponse({'login_message': 'Login suceess!'}, status=202)
        else:
            return JsonResponse({'login_message': 'Invalid username or password!'}, status=400)

    return render (request,'index.html')

# def signup(request):
#     if request.method == 'POST':
#         post_data = request.POST.copy() 
#         post_data['password2'] = post_data['password1']
#         form = CustomUserCreationForm(post_data)
#         # Set password2 equal to password1 before form validation
#         if form.is_valid():
#             email = form.cleaned_data['email']
#             first_name = form.cleaned_data['first_name']
#             last_name = form.cleaned_data['last_name']
#             password = form.cleaned_data['password1']  # Use password1 field
#             # Create a user using create_user method
#             user = CustomUser().objects.create_user(email=email, first_name=first_name, last_name=last_name, password=password)
#             login(request, user)
#         else:
#             print('Form is invalid')
#             print(form.errors)
#     else:
#         form = CustomUserCreationForm()
#     return render(request, 'index.html', {'form': form})