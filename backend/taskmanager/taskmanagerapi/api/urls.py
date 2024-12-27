from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, UserViewSet, LoginView, ProtectedView

router = DefaultRouter()
router.register(r"tasks", TaskViewSet, basename="task")
router.register(r'register', UserViewSet, basename="register")


urlpatterns = [
    path("", include(router.urls)),
    path("login/", LoginView.as_view(), name="login"),
    path("protected/", ProtectedView.as_view(), name="protected"),
]
