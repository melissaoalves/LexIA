from docxtpl import DocxTemplate, InlineImage
import os
from docx.shared import Cm

def montar_imagem(doc, caminho_imagem, tamanho_cm):
    return InlineImage(doc, caminho_imagem, width=Cm(tamanho_cm), height=Cm(tamanho_cm))

def gerar_peticao(dados, caminho_template, caminho_saida):
    doc = DocxTemplate(caminho_template)

    logo_path = dados.get("logo_escritorio")
    if logo_path:
        dados["logo_escritorio"] = montar_imagem(doc, logo_path, 4)

    doc.render(dados)
    doc.save(caminho_saida)
    return caminho_saida
