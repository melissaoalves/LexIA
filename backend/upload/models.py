from django.db import models

class Escritorio(models.Model):
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='logos/', null=True, blank=True)
    cnpj = models.CharField(max_length=18)
    oab = models.CharField(max_length=50)
    telefone = models.CharField(max_length=20)

    cep = models.CharField(max_length=9, blank=True, null=True)
    logradouro = models.CharField(max_length=255, blank=True, null=True)
    numero = models.CharField(max_length=10, blank=True, null=True)
    complemento = models.CharField(max_length=50, blank=True, null=True)
    bairro = models.CharField(max_length=100, blank=True, null=True)
    cidade = models.CharField(max_length=100, blank=True, null=True)
    estado = models.CharField(max_length=2, blank=True, null=True)

    qtd_funcionarios = models.PositiveIntegerField(default=0)
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

    # Armazena os dados extraídos da petição em formato JSON
    dados_extraidos = models.JSONField(null=True, blank=True)

    # Armazena o arquivo .docx gerado da petição
    arquivo_peticao = models.FileField(upload_to='peticoes/', null=True, blank=True)

    def __str__(self):
        return f"Causa de {self.nome_cliente}"


class AdvogadoCausa(models.Model):
    advogado = models.ForeignKey(Advogado, on_delete=models.CASCADE)
    causa = models.ForeignKey(Causa, on_delete=models.CASCADE)
    papel = models.CharField(max_length=100)  # Exemplo: "Defensor", "Assistente"

    def __str__(self):
        return f"{self.advogado.nome} - {self.causa.nome_cliente}"

    class Meta:
        unique_together = ['advogado', 'causa']


class Documento(models.Model):
    nome = models.CharField(max_length=255)
    arquivo = models.FileField(upload_to='documentos/')
    data_upload = models.DateTimeField(auto_now_add=True)
    
    # Relacionamento com a causa (petição) à qual o documento pertence
    causa = models.ForeignKey(Causa, on_delete=models.CASCADE, null=True, blank=True, related_name='documentos')

    # Texto extraído do documento
    texto_extraido = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.nome
