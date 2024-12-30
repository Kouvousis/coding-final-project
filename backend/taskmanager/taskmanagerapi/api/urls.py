from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, UserRegisterViewSet, LoginView, ProtectedView, UserUpdateView, UserDeleteView

router = DefaultRouter()
router.register(r"tasks", TaskViewSet, basename="task")
router.register(r'register', UserRegisterViewSet, basename="register")


urlpatterns = [
    path("", include(router.urls)),
    path("login/", LoginView.as_view(), name="login"),
    path("protected/", ProtectedView.as_view(), name="protected"),
    path('update-user/', UserUpdateView.as_view(), name='update-user'),
    path('delete-user/', UserDeleteView.as_view(), name='delete-user'),
]
