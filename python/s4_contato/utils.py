import json
import os

#retorna texto strippado
def ler_texto(msg):
    while True:
        valor = input(msg).strip()
        if valor:
            return valor
        print("Valor inválido. Tente novamente.")

#valida se é email tendo @ e .
def ler_email(msg):
    while True:
        email = input(msg).strip()
        if email == "":
            return ""
        if "@" in email and "." in email:
            return email
        print("E-mail inválido.")

#recebe o cep e valida se tem 8 digitos
def ler_cep(msg):
    while True:
        cep = input(msg).strip().replace("-", "")
        if cep.isdigit() and len(cep) == 8:
            return cep
        print("CEP inválido. Digite 8 números.")

#valida o tipo de documento
def ler_tipo_documento():
    tipos_validos = ["CPF", "RG", "CNPJ", "PASSAPORTE"]
    while True:
        tipo = input("Tipo de documento (CPF/RG/CNPJ/PASSAPORTE): ").strip().upper()
        if tipo in tipos_validos:
            return tipo
        print("Tipo de documento inválido.")

#pega o número do documento
def ler_numero_documento():
    while True:
        numero = input("Número do documento: ").strip()
        if numero:
            return numero
        print("Número do documento inválido.")

#valida o tipo do contato
def ler_tipo_contato():
    tipos_validos = ["PACIENTE", "DOADOR", "SOLICITANTE", "DENTISTA"]
    while True:
        tipo = input("Tipo de contato (PACIENTE/DOADOR/SOLICITANTE/DENTISTA): ").strip().upper()
        if tipo in tipos_validos:
            return tipo
        print("Tipo de contato inválido.")

#pega o cro do dentista
def ler_cro():
    while True:
        cro = input("CRO do dentista: ").strip()
        if cro:
            return cro
        print("CRO inválido.")

#exporta para um json dentro da pasta exports o contato que foi consultado
def exportar_json(nome_arquivo, dados):
    try:
        os.makedirs("exports", exist_ok=True)
        caminho = os.path.join("exports", nome_arquivo)

        with open(caminho, "w", encoding="utf-8") as arquivo:
            json.dump(dados, arquivo, ensure_ascii=False, indent=4)

        print(f"Arquivo JSON exportado com sucesso em: {caminho}")
    except Exception as e:
        print(f"Erro ao exportar JSON: {e}")
