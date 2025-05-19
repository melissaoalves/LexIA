from django.conf import settings
from openai import OpenAI

client = OpenAI(api_key=settings.OPENAI_API_KEY)

def extrair_dados_peticao(texto):
    prompt = f"""
    Extraia os seguintes dados do texto abaixo para preencher uma petição inicial do BPC-LOAS no formato JSON:

    - nome autor
    - sufixo genero: o se for homem e a se for mulher 
    - estado_civil: inicie com letra minuscula 
    - cpf
    - rg
    - endereco_completo
    - nome_mae
    - nb
    - der
    - endereco_inss
    - cid: retornar nessa estrutura "Nome da Doença (CID)" Exemplo: "Esquizofrenia paranoide (CID10 F20.0), Transtorno afetivo bipolar (CID10 F31.5), Transtorno de personalidade (CID10 F60.3)" se tiver mais de um cid, retornar separando com ,  e retonar todos em maiusculo
    - nome_medico: se tiver mais de um medico adapte no texto
    - crm: retornar nessa estrutura "CRM{{uf_crm}}/{{crm}}" Exemplo: "CRM/RJ 12345"
    - motivo_indeferimento: retornar de forma fluida para combinar com o paragrafo (ex.: supostamente não atender ao critério de  
impedimento a longo prazo.)
    - quadro_clinico: retorne organizado e fluido, tem que se encaixar no paragrafo abaixo:
Também, é importante ressaltar que, em decorrência das mesmas, no tocante ao convívio social, o ora requerente {{quadro_clinico}}
    - dependencia_materna:  se for menor de idade tem que ter esse parágrafo "Ainda, em razão de sua condição, o ora requerente é totalmente dependente de sua genitora, esta que é responsável pelos cuidados e tratamentos da ora autora, além dos cuidados próprios. Logo, importa gizar que o quadro clínico do ora demandante consta com elevada demanda parental."
    - medicacoes: tem que se encaixar no seguinte texto: ... o ora requerente realiza o seu tratamento  com  {{medicacoes}}
    - data_atestado
    - qtd_componentes_familiar
    - renda
    - valor_causa: retornar nessa estrutura "R$ {{valor_causa}} ({{valor_causa_por_extenso}})" Exemplo: "R$ 1.212,00 (Um mil duzentos e doze reais)"

    Retorne SOMENTE o JSON.
    Texto:
    {texto}
    """

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )
    text_response = response.choices[0].message.content

    # Extrai JSON do texto retornado (exemplo)
    json_start = text_response.find('{')
    json_end = text_response.rfind('}') + 1
    json_clean = text_response[json_start:json_end]

    print("JSON extraído:", json_clean)
    return json_clean