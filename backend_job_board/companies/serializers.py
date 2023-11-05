from rest_framework import serializers
from phonenumber_field.serializerfields import PhoneNumberField
from .models import Company, Recruiter


# https://stackoverflow.com/a/23674297/16772424
class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        fields = self.context["request"].query_params.get("fields")
        if fields is not None:
            fields = fields.split(",")
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class CompanySerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Company
        fields = ["id", "name", "country", "industry", "linkedin"]


class RecruiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recruiter
        fields = ["id", "name", "email", "phone", "linkedin", "company"]
