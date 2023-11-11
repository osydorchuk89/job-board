from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from djoser.serializers import UserSerializer as BaseUserSerializer, UserCreateSerializer as BaseUserCreateSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer as BaseTokenObtainPairSerializer


User = get_user_model()


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ["id", "username", "password", "email", "first_name", "last_name", "user_group"]

    def create(self, validated_data):
        user = super().create(validated_data)
        user_group_name = validated_data["user_group"]
        group = Group.objects.get(name=user_group_name)
        user.groups.add(group)
        return user


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "user_group"]


class TokenObtainPairSerializer(BaseTokenObtainPairSerializer):
    def validate(self, attrs):
        ## This data variable will contain refresh and access tokens
        data = super().validate(attrs)
        ## You can add more User model's attributes like username,email etc. in the data dictionary like this.
        data["user_id"] = self.user.id
        data["email"] = self.user.email
        data["first_name"] = self.user.first_name
        data["last_name"] = self.user.last_name
        data["user_group"] = self.user.user_group
        return data
