from docxtpl import DocxTemplate
import json

def gerar_peticao(dados, caminho_template, caminho_saida):
    doc = DocxTemplate(caminho_template)
    doc.render(dados)
    doc.save(caminho_saida)

    return caminho_saida
