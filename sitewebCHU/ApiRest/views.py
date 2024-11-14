from django.shortcuts import render
from rest_framework import viewsets,generics,status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView

import logging

logger = logging.getLogger(__name__)

from ApiRest.models import Contact,Equipe,Soins,Admin,Condition,Service,Partenaires,Doleance
from ApiRest.serializers import ContactSerializer,EquipeSerializer,SoinsSerializer,AdminSerializer,LoginSerializer,ConditionSerializer,ServiceSerializer,PartenairesSerializer,DoleanceSerializer

# Create your views here.

def dashboard_data(request):
    # Count totals
    total_services = Service.objects.count()
    total_soins = Soins.objects.count()

    # Get list of services with soins titles
    services_data = []
    for service in Service.objects.all():
        soins_titres = Soins.objects.filter(ServiceId=service.ServiceId).values_list('SoinsTitre', flat=True)
        services_data.append({
            'ServiceTitre': service.ServiceTitre,
            'SoinsTitre': list(soins_titres),  # Updated key to SoinsTitre
        })

    # Combine all data into a response
    data = {
        'total_services': total_services,
        'total_soins': total_soins,
        'services': services_data
    }
    return JsonResponse(data)

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    
class PartenairesViewSet(viewsets.ModelViewSet):
    queryset = Partenaires.objects.all()
    serializer_class = PartenairesSerializer
    
class EquipeViewSet(viewsets.ModelViewSet):
    queryset = Equipe.objects.all()
    serializer_class = EquipeSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    
class SoinsViewSet(viewsets.ModelViewSet):
    queryset = Soins.objects.all()
    serializer_class = SoinsSerializer

    def create(self, request, *args, **kwargs):
        logger.debug(f"Received data: {request.data}")

        # Ensure ServiceId is in the request data
        if 'ServiceId' not in request.data:
            return Response({"error": "ServiceId is required"}, status=status.HTTP_400_BAD_REQUEST)

        return super().create(request, *args, **kwargs)


class ConditionViewSet(viewsets.ModelViewSet):
    queryset = Condition.objects.all()
    serializer_class = ConditionSerializer

class DoleanceViewSet(viewsets.ModelViewSet):
    queryset = Doleance.objects.all()
    serializer_class = DoleanceSerializer

class AdminCreateView(generics.CreateAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class AdminLoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['AuthentificationNom']
            password = serializer.validated_data['AuthentificationMotDePasse']
            try:
                admin = Admin.objects.get(AuthentificationNom=username)
                if admin.verify_password(password):
                    # Connexion réussie
                    return Response({"message": "Connexion réussie", "username": admin.AuthentificationNom}, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Mot de passe incorrect"}, status=status.HTTP_400_BAD_REQUEST)
            except Admin.DoesNotExist:
                return Response({"error": "Nom d'utilisateur non trouvé"}, status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Vue spécifique pour les soins du service "Laboratoire"
class SoinsLaboratoireViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="Laboratoire")
    
# Vue spécifique pour les conditions du service "Laboratoire"
class ConditionLaboratoireViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ConditionSerializer

    def get_queryset(self):
        return Condition.objects.filter(SoinsId__ServiceId__ServiceTitre="Laboratoire")

# Vue spécifique pour les soins du service "Centre Régional de la Transfusion Sanguine"
class SoinsCRTSViewSet(viewsets.ModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="Centre Regional de la Transfusion Sanguine")

# Vue spécifique pour les conditions du service "Centre Régional de la Transfusion Sanguine"
class ConditionCRTSViewSet(viewsets.ModelViewSet):
    serializer_class = ConditionSerializer

    def get_queryset(self):
        # Filter conditions for soins under Centre Régional de la Transfusion Sanguine
        return Condition.objects.filter(SoinsId__ServiceId__ServiceTitre="Centre Regional de la Transfusion Sanguine")

# Vue spécifique pour les soins du service "Maladie Infectueuse"
class SoinsMaladieInfectueuseViewSet(viewsets.ModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="Maladie Infectueuse")
    
# Vue spécifique pour les soins du service "Accueil-Triage-Urgence"
class SoinsAtuViewSet(viewsets.ModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="Accueil-Triage-Urgence")
    
# Vue spécifique pour les soins du service "USFR Ophtalmologie"
class SoinsOphtalmologieViewSet(viewsets.ModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="USFR Ophtalmologie")
    
# Vue spécifique pour les soins du service "Oncologie"
class SoinsOncologieViewSet(viewsets.ModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="Oncologie")
    
# Vue spécifique pour les soins du service "Psycathrie"
class SoinsPsycathrieViewSet(viewsets.ModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="Psycathrie")
    
# Vue spécifique pour les soins du service "Pneumologie"
class SoinsPneumologieViewSet(viewsets.ModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="Pneumologie")
    
# Vue spécifique pour les soins du service "Neurochirurgie"
class SoinsNeurochirurgieViewSet(viewsets.ModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="Neurochirurgie")
    
# Vue spécifique pour les soins du service "Chirurgie visceral"
class SoinsChirurgieVisceralViewSet(viewsets.ModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="Chirurgie visceral")
    
# Vue spécifique pour les soins du service "Cardiologie"
class SoinsCardiologieViewSet(viewsets.ModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="Cardiologie")
    
# Vue spécifique pour les soins du service "Pediatrie"
class SoinsPediatrieViewSet(viewsets.ModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="Pediatrie")
    
# Vue spécifique pour les soins du service "Medecine preventive"
class SoinsMedecinePreventiveViewSet(viewsets.ModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="Medecine preventive")
    
# Vue spécifique pour les soins du service "Reanimation Anesthesiologie"
class SoinsReanimationViewSet(viewsets.ModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="Reanimation Anesthesiologie")
    
# Vue spécifique pour les soins du service "Bloc operatoire"
class SoinsBlocViewSet(viewsets.ModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="Bloc operatoire")

# Vue spécifique pour les soins du service "Medecine interne et Hepato-Gastro Enterologie"
class SoinsMedecineInterneViewSet(viewsets.ModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="Medecine interne et Hepato-Gastro Enterologie")
    
# Vue spécifique pour les soins du service "Neonatologie"
class SoinsNeonatologieViewSet(viewsets.ModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="Neonatologie")
    
# Vue spécifique pour les soins du service "Appareillage et de Reeducation"
class SoinsSARViewSet(viewsets.ModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="Appareillage et de Reeducation")
    
# Vue spécifique pour les soins du service "Gyneco-Obstetrique"
class SoinsGynecoObstetriqueViewSet(viewsets.ModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="Gyneco-Obstetrique")
    
# Vue spécifique pour les soins du service "Imagerie medical"
class SoinsImagerieMedicalViewSet(viewsets.ModelViewSet):
    serializer_class = SoinsSerializer

    def get_queryset(self):
        return Soins.objects.filter(ServiceId__ServiceTitre="Imagerie medical")
       