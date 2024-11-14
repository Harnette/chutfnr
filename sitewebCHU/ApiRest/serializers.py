from rest_framework import serializers
from ApiRest.models import Contact,Equipe,Soins,Admin,Condition,Service,Partenaires,Doleance

#Serializer contact
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['ContactId','NumeroUrgence','Email']

#Serializer partenaire
class PartenairesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partenaires
        fields = ['PartenairesId', 'PartenairesNom', 'PartenairesPage']

#Serializer equipe
class EquipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipe
        fields = '__all__'

#Serializer service
class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['ServiceId', 'ServiceTitre', 'ServiceDescription', 'ServiceImage']

#Serializer condition
class ConditionSerializer(serializers.ModelSerializer):
    SoinsTitre = serializers.CharField(source='SoinsId.SoinsTitre', read_only=True)

    class Meta:
        model = Condition
        fields = ['ConditionId', 'ConditionList', 'SoinsId', 'SoinsTitre']

class SoinsSerializer(serializers.ModelSerializer):
    conditions = ConditionSerializer(many=True, read_only=True)
    ServiceId = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all())  # Ensure ServiceId is required

    class Meta:
        model = Soins
        fields = ['SoinsId', 'SoinsTitre', 'SoinsDescription', 'SoinsImage', 'ServiceId', 'conditions']



class DoleanceSerializer(serializers.ModelSerializer):
    ServiceTitre = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all())
    ServiceTitre_display = serializers.CharField(source='ServiceTitre.ServiceTitre', read_only=True)
    formatted_date = serializers.ReadOnlyField()

    class Meta:
        model = Doleance
        fields = ['ServiceTitre', 'ServiceTitre_display', 'Message', 'formatted_date']


#Serializer admin
class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['AuthentificationNom', 'AuthentificationMotDePasse']

class LoginSerializer(serializers.Serializer):
    AuthentificationNom = serializers.CharField()
    AuthentificationMotDePasse = serializers.CharField()