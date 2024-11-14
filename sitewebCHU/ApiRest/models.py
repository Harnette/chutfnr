from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.utils import timezone

#Modèle contact
class Contact(models.Model):
    ContactId = models.AutoField(primary_key=True)
    NumeroUrgence = models.CharField(max_length=14)
    Email = models.CharField(max_length=200)

    def __str__(self):
        return self.Email

#Modèle partenaires
class Partenaires(models.Model):
    PartenairesId = models.AutoField(primary_key=True)
    PartenairesNom = models.CharField(max_length=255)
    PartenairesPage = models.URLField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.PartenairesNom

#Modèle equipe
class Equipe(models.Model):
    EquipeId = models.AutoField(primary_key=True)
    EquipeNom = models.CharField(max_length=100)
    EquipeFonction = models.CharField(max_length=255)
    EquipePhoto = models.ImageField(upload_to='equipe/')
    def __str__(self):
        return self.EquipeNom

#Modèle service
class Service(models.Model):
    ServiceId = models.AutoField(primary_key=True)
    ServiceTitre = models.CharField(max_length=100)
    ServiceDescription = models.TextField(blank=True, null=True)
    ServiceImage = models.ImageField(upload_to='service/')

    def __str__(self):
        return self.ServiceTitre
#Modèle soin
class Soins(models.Model):
    SoinsId = models.AutoField(primary_key=True)
    SoinsTitre = models.CharField(max_length=100)
    SoinsDescription = models.TextField(blank=True, null=True)
    SoinsImage = models.ImageField(upload_to='soins/', blank=True, null=True)
    ServiceId = models.ForeignKey(Service, on_delete=models.CASCADE)

    def __str__(self):
        return self.SoinsTitre
    
 #Modèle condition   
class Condition(models.Model):
    ConditionId = models.AutoField(primary_key=True)
    ConditionList = models.CharField(max_length=2000)
    SoinsId = models.ForeignKey(Soins, on_delete=models.CASCADE, related_name='conditions')

    def __str__(self):
        return self.ConditionList
    
 #Modèle doleance   
class Doleance(models.Model):
    ServiceTitre = models.ForeignKey(Service, on_delete=models.CASCADE)  # Lien avec le modèle Service
    Message = models.TextField()
    Date = models.DateField(default=timezone.now)  # Capture automatique de la date de la doléance

    def __str__(self):
        return f"Doléance de {self.ServiceTitre.ServiceTitre}"
    
    @property
    def formatted_date(self):
        return self.Date.strftime("%d/%m/%Y")
 
 #Modèle admin   
class Admin(models.Model):
    AuthentificationNom = models.CharField(max_length=150, unique=True)
    AuthentificationMotDePasse = models.CharField(max_length=128)

    def save(self, *args, **kwargs):
        # Hash le mot de passe avant de le sauvegarder
        if not self.pk:  # Vérifie si l'objet est nouveau
            self.AuthentificationMotDePasse = make_password(self.AuthentificationMotDePasse)
        super().save(*args, **kwargs)

    def verify_password(self, password):
        return check_password(password, self.AuthentificationMotDePasse)