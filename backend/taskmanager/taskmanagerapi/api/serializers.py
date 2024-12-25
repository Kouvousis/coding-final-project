from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from taskmanagerapi.models import Task
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
        
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'due_date', 'created_at', 'updated_at', 
                 'completed', 'completed_at', 'priority']
        read_only_fields = ['user', 'created_at', 'updated_at', 'completed_at']
        
        
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email already exists')
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError('Invalid credentials')
            
            refresh = RefreshToken.for_user(user)
            data['tokens'] = {
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }
            data['user'] = {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
            return data
        raise serializers.ValidationError('Must include username and password')