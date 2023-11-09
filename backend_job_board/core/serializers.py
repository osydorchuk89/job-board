from django.contrib.auth import get_user_model
from djoser.serializers import UserSerializer as BaseUserSerializer, UserCreateSerializer as BaseUserCreateSerializer


User = get_user_model()


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ["id", "username", "password", "email", "first_name", "last_name"]


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ["id", "username", "email", "first_name", "last_name"]
