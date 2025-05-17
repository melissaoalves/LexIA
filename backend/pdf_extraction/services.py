from docxtpl import DocxTemplate
import json

def gerar_peticao(dados_extraidos_json, caminho_template, caminho_saida):
    # Converter JSON string para dicionário
    dados_extraidos = json.loads(dados_extraidos_json)
    
    doc = DocxTemplate(caminho_template)
    
    # Renderizar o template substituindo os placeholders pelos dados do dicionário
    doc.render(dados_extraidos)
    
    # Salvar arquivo preenchido
    doc.save(caminho_saida)
    
    return caminho_saida
