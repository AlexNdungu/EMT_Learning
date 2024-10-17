from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_id = models.AutoField(primary_key=True)
    full_name = models.CharField(max_length=50, verbose_name='Full Name')
    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)
    # Groups will be handled by django
    def __str__(self):
        return self.full_name
    
class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=50,default='Course Name',verbose_name='Course Name')
    creator = models.OneToOneField(Profile, on_delete=models.CASCADE)
    approval_status = models.BooleanField(default=False)
    students_enrolled = models.ManyToManyField(Profile, blank=True,null=True)
    students_enrolled_but_completed = models.ManyToManyField(Profile, blank=True,null=True)
    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.course_name
