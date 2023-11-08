from rest_framework import serializers
from phonenumber_field.serializerfields import PhoneNumberField
from .models import Candidate


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


class CandidateSerializer(DynamicFieldsModelSerializer):
    # user_id = serializers.IntegerField()

    class Meta:
        model = Candidate
        fields = "__all__"
