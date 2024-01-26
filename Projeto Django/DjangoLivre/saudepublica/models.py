# Create your models here.
from django.db import models

class Hospital(models.Model):
    nome = models.CharField(max_length=100)
    endereco = models.CharField(max_length=255)
    telefone = models.CharField(max_length=15)
    capacidade_leitos = models.IntegerField()

    def __str__(self):
        return self.nome

class Paciente(models.Model):
    nome = models.CharField(max_length=100)
    idade = models.IntegerField()
    genero = models.CharField(max_length=10)
    endereco = models.CharField(max_length=255)
    telefone = models.CharField(max_length=15)
    historico_medico = models.TextField(blank=True)

    def __str__(self):
        return self.nome

class RegistroMedico(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    data_entrada = models.DateField()
    sintomas = models.TextField()
    diagnostico = models.TextField()
    tratamento = models.TextField()

    def __str__(self):
        return f"Registro Médico de {self.paciente.nome} em {self.hospital.nome}"
    
class Usuario(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=255)

    def save(self, *args, **kwargs):
        # Utilize o make_password para criptografar a senha antes de salvar no banco de dados
        self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username