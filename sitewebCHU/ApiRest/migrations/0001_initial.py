# Generated by Django 5.0.1 on 2024-11-10 08:51

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('AuthentificationNom', models.CharField(max_length=150, unique=True)),
                ('AuthentificationMotDePasse', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('ContactId', models.AutoField(primary_key=True, serialize=False)),
                ('NumeroUrgence', models.CharField(max_length=14)),
                ('Email', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Equipe',
            fields=[
                ('EquipeId', models.AutoField(primary_key=True, serialize=False)),
                ('EquipeNom', models.CharField(max_length=50)),
                ('EquipeFonction', models.CharField(max_length=50)),
                ('EquipePhoto', models.ImageField(upload_to='equipe/')),
            ],
        ),
        migrations.CreateModel(
            name='Partenaires',
            fields=[
                ('PartenairesId', models.AutoField(primary_key=True, serialize=False)),
                ('PartenairesNom', models.CharField(max_length=255)),
                ('PartenairesPage', models.URLField(blank=True, max_length=500, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('ServiceId', models.AutoField(primary_key=True, serialize=False)),
                ('ServiceTitre', models.CharField(max_length=100)),
                ('ServiceDescription', models.TextField(blank=True, null=True)),
                ('ServiceImage', models.ImageField(upload_to='service/')),
            ],
        ),
        migrations.CreateModel(
            name='Doleance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Message', models.TextField()),
                ('Date', models.DateTimeField(default=django.utils.timezone.now)),
                ('ServiceTitre', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ApiRest.service')),
            ],
        ),
        migrations.CreateModel(
            name='Soins',
            fields=[
                ('SoinsId', models.AutoField(primary_key=True, serialize=False)),
                ('SoinsTitre', models.CharField(max_length=100)),
                ('SoinsDescription', models.TextField(blank=True, null=True)),
                ('SoinsImage', models.ImageField(upload_to='soins/')),
                ('ServiceId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ApiRest.service')),
            ],
        ),
        migrations.CreateModel(
            name='Condition',
            fields=[
                ('ConditionId', models.AutoField(primary_key=True, serialize=False)),
                ('ConditionList', models.CharField(max_length=200)),
                ('SoinsId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='conditions', to='ApiRest.soins')),
            ],
        ),
    ]
