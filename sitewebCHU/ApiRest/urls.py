from django.urls import re_path
from ApiRest import views

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  AdminCreateView, AdminLoginView, SoinsLaboratoireViewSet, ConditionLaboratoireViewSet, SoinsCRTSViewSet, ConditionCRTSViewSet, SoinsAtuViewSet, SoinsOncologieViewSet, SoinsOphtalmologieViewSet, SoinsPsycathrieViewSet, SoinsNeurochirurgieViewSet, SoinsMaladieInfectueuseViewSet, SoinsMedecinePreventiveViewSet, SoinsBlocViewSet, SoinsPediatrieViewSet, SoinsPneumologieViewSet, SoinsReanimationViewSet, SoinsChirurgieVisceralViewSet, SoinsCardiologieViewSet, SoinsMedecineInterneViewSet, SoinsImagerieMedicalViewSet, SoinsNeonatologieViewSet, SoinsGynecoObstetriqueViewSet, SoinsSARViewSet
from . import views

router = DefaultRouter()
router.register(r'service', views.ServiceViewSet)
router.register(r'soins', views.SoinsViewSet)
router.register(r'conditions', views.ConditionViewSet)
router.register(r'equipe', views.EquipeViewSet)
router.register(r'partenaires', views.PartenairesViewSet)
router.register(r'contact', views.ContactViewSet)
router.register(r'doleances', views.DoleanceViewSet)

# Routes spécifiques pour le service "Laboratoire"
router.register(r'soins-laboratoire', SoinsLaboratoireViewSet, basename='soins-laboratoire')
router.register(r'conditions-laboratoire', ConditionLaboratoireViewSet, basename='conditions-laboratoire')

# Routes spécifiques pour le service "crts"
router.register(r'soins-crts', SoinsCRTSViewSet, basename='soins-crts')
router.register(r'conditions-crts', ConditionCRTSViewSet, basename='conditions-crts')

# Routes spécifiques pour le service "Accueil-Triage-Urgence"
router.register(r'soins-atu', SoinsAtuViewSet, basename='soins-atu')

# Routes spécifiques pour le service "Oncologie"
router.register(r'soins-oncologie', SoinsOncologieViewSet, basename='soins-oncologie')

# Routes spécifiques pour le service "Psycathrie"
router.register(r'soins-psycathrie', SoinsPsycathrieViewSet, basename='soins-psycathrie')

# Routes spécifiques pour le service "Pneumologie"
router.register(r'soins-pneumologie', SoinsPneumologieViewSet, basename='soins-pneumologie')

# Routes spécifiques pour le service "Neurochirurgie"
router.register(r'soins-neurochirurgie', SoinsNeurochirurgieViewSet, basename='soins-neurochirurgie')

# Routes spécifiques pour le service "Chirurgie visceral"
router.register(r'soins-chirurgie-visceral', SoinsChirurgieVisceralViewSet, basename='soins-chirurgie-visceral')

# Routes spécifiques pour le service "Cardiologie"
router.register(r'soins-cardiologie', SoinsCardiologieViewSet, basename='soins-cardiologie')

# Routes spécifiques pour le service "Pediatrie"
router.register(r'soins-pediatrie', SoinsPediatrieViewSet, basename='soins-pediatrie')

# Routes spécifiques pour le service "Medecine preventive"
router.register(r'soins-medecine-preventive', SoinsMedecinePreventiveViewSet, basename='soins-medecine-preventive')

# Routes spécifiques pour le service "Reanimation Anesthesiologie"
router.register(r'soins-reanimation', SoinsReanimationViewSet, basename='soins-reanimation')

# Routes spécifiques pour le service "Bloc operatoire"
router.register(r'soins-bloc', SoinsBlocViewSet, basename='soins-bloc')

# Routes spécifiques pour le service "Bloc operatoire"
router.register(r'soins-ophtalmologie', SoinsOphtalmologieViewSet, basename='soins-ophtalmologie')

# Routes spécifiques pour le service "Maladie infectueuse"
router.register(r'soins-maladie-infectueuse', SoinsMaladieInfectueuseViewSet, basename='soins-maladie-infectueuse')

# Routes spécifiques pour le service "Medecine Interne"
router.register(r'soins-medecine-interne', SoinsMedecineInterneViewSet, basename='soins-medecine-interne')

# Routes spécifiques pour le service "Imagerie Medical"
router.register(r'soins-imagerie-medical', SoinsImagerieMedicalViewSet, basename='soins-imagerie-medical')

# Routes spécifiques pour le service "Gyneco-Obstetrique"
router.register(r'soins-gyneco-obstetrique', SoinsGynecoObstetriqueViewSet, basename='soins-gyneco-obstetrique')

# Routes spécifiques pour le service "SAR"
router.register(r'soins-sar', SoinsSARViewSet, basename='soins-sar')

# Routes spécifiques pour le service "Neonatologie"
router.register(r'soins-neonatologie', SoinsNeonatologieViewSet, basename='soins-neonatologie')


urlpatterns=[
    path('', include(router.urls)),
    path('admins', AdminCreateView.as_view(), name='admin-create'),
    path('api/admins/login/', AdminLoginView.as_view(), name='admin-login'),
    path('dashboard-data/', views.dashboard_data, name='dashboard_data'),
]