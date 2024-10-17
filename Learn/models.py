from django.db import models
from django.contrib.auth.models import User

# Create your models here.

user_role = (
    ('none','None'),
    ('student','Student'),
    ('teacher', 'Teacher'),
    ('approver','Approver')
)
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_id = models.AutoField(primary_key=True)
    user_roles = models.CharField(max_length=15, choices=user_role, default='none')
    full_name = models.CharField(max_length=50, verbose_name='Full Name')
    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.full_name
    
class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=50,default='Course Name',verbose_name='Course Name')
    creator = models.OneToOneField(Profile, on_delete=models.CASCADE)
    approval_status = models.BooleanField(default=False)
    students_enrolled = models.ManyToManyField(Profile, blank=True,null=True,related_name='all_students_enrolled')
    students_enrolled_but_completed = models.ManyToManyField(Profile, blank=True,null=True,related_name='all_students_completed_course')
    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.course_name
    
class CourseFiles(models.Model):
    course =  models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name='Couse',related_name='Course')
    file_id = models.AutoField(primary_key=True)
    # document_name = models.CharField(max_length=50,default='CoFileurse Name',verbose_name='File Name')
    document = models.FileField(upload_to='Documents')
    # def __str__(self):
    #     return self.document_name