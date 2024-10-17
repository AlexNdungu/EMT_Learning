# Generated by Django 4.2.2 on 2024-10-17 09:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('course_id', models.AutoField(primary_key=True, serialize=False)),
                ('course_name', models.CharField(default='Course Name', max_length=50, verbose_name='Course Name')),
                ('approval_status', models.BooleanField(default=False)),
                ('update', models.DateTimeField(auto_now=True)),
                ('created', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('profile_id', models.AutoField(primary_key=True, serialize=False)),
                ('user_roles', models.CharField(choices=[('none', 'None'), ('student', 'Student'), ('teacher', 'Teacher'), ('approver', 'Approver')], default='none', max_length=15)),
                ('full_name', models.CharField(max_length=50, verbose_name='Full Name')),
                ('update', models.DateTimeField(auto_now=True)),
                ('created', models.DateField(auto_now_add=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CourseFiles',
            fields=[
                ('file_id', models.AutoField(primary_key=True, serialize=False)),
                ('document', models.FileField(upload_to='Documents')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Course', to='Learn.course', verbose_name='Couse')),
            ],
        ),
        migrations.AddField(
            model_name='course',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Learn.profile', verbose_name='Course Owner'),
        ),
        migrations.AddField(
            model_name='course',
            name='students_enrolled',
            field=models.ManyToManyField(blank=True, null=True, related_name='all_students_enrolled', to='Learn.profile'),
        ),
        migrations.AddField(
            model_name='course',
            name='students_enrolled_but_completed',
            field=models.ManyToManyField(blank=True, null=True, related_name='all_students_completed_course', to='Learn.profile'),
        ),
    ]
