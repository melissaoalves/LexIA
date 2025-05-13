from django.db import models

class Escritorio(models.Model):
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=255)
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

class Advogado(models.Model):
    escritorio = models.ForeignKey(Escritorio, on_delete=models.CASCADE, related_name='advogados')
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    oab = models.CharField(max_length=20)
    data_admissao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

class Causa(models.Model):
    nome_cliente = models.CharField(max_length=255)
    data_criacao = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=255)

    advogados = models.ManyToManyField(Advogado, through='AdvogadoCausa')

    def __str__(self):
        return f"Causa de {self.nome_cliente}"

class AdvogadoCausa(models.Model):
    advogado = models.ForeignKey(Advogado, on_delete=models.CASCADE)
    causa = models.ForeignKey(Causa, on_delete=models.CASCADE)
    papel = models.CharField(max_length=100)  # Ex: "Defensor", "Assistente"

    def __str__(self):
        return f"{self.advogado.nome} - {self.causa.nome_cliente}"

    class Meta:
        unique_together = ['advogado', 'causa']

class Documento(models.Model):
    nome = models.CharField(max_length=255)
    arquivo = models.FileField(upload_to='documentos/')
    data_upload = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome
