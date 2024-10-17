from django.urls import path
from . import views

urlpatterns = [
    path('',views.signup, name='Sign_Up'),
    path('createNewUser/', views.createNewUser, name='create_new_user'),
    path('login/',views.signin,name='login'),
    path('signinUser/', views.signInUser, name='signin_user'),
    path('signout/',views.signOut, name='signout'),

    path('menu/',views.Menu,name='menu'),
    path('Course/',views.Course,name='teacher_course'),
]