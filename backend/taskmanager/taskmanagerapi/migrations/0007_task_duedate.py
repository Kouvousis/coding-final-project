# Generated by Django 5.1.4 on 2024-12-25 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taskmanagerapi', '0006_alter_task_completed_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='dueDate',
            field=models.DateField(blank=True, null=True),
        ),
    ]
