# Generated by Django 5.1.4 on 2024-12-25 16:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taskmanagerapi', '0008_remove_task_duedate_task_due_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='due_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
