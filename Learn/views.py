from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login,logout
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

# Create your views here.

def signup(request):
    # if request.user.is_authenticated:
    #     return redirect('new_task')
    # else:
        return render(request,'Auth/signup.html')

def createNewUser(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        email = request.POST.get('email')
        password = request.POST.get('password')
        if User.objects.filter(email=email).exists():
            return JsonResponse({'status':'exists'})
        else:
            user = User.objects.create_user(username=email, email=email, password=password)
            if not request.user.is_authenticated:
                login(request,user,backend='django.contrib.auth.backends.ModelBackend')
            return JsonResponse({'status':'created'})

def signin(request):
    # if request.user.is_authenticated:
    #     return redirect('new_task')
    # else:
        return render(request,'Auth/signin.html')

def signInUser(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        email = request.POST.get('email')
        password = request.POST.get('password')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            if user.check_password(password):
                login(request,user,backend='django.contrib.auth.backends.ModelBackend')
                return JsonResponse({'status':'found'})
            else:
                return JsonResponse({'status':'wrong_password'})
        else:
            return JsonResponse({'status':'not_found'})
        
def signOut(request):  
    logout(request)
    return redirect('login')
