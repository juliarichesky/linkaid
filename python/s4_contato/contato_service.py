from contato_dao import (
    criar_tabela_contato,
    inserir_contato,
    listar_contatos,
    buscar_contato_por_id,
    atualizar_contato,
    excluir_contato,
    consultar_contato_por_numero_documento,
    consultar_contato_por_tipo_documento
)
from api_externa import consultar_cep_viacep
from utils import (
    ler_texto,
    ler_email,
    ler_cep,
    ler_tipo_documento,
    ler_numero_documento,
    ler_cro,
    exportar_json
)

#recebe do usuário e insere um contato na tabela
def cadastrar_contato(tipo_contato):
    try:
        nome = ler_texto(f"Nome do {tipo_contato.lower()}: ")
        tipo_documento = ler_tipo_documento()
        numero_documento = ler_numero_documento()
        email = ler_email(f"E-mail do {tipo_contato.lower()} (ou Enter para vazio): ")
        cep = ler_cep(f"CEP do {tipo_contato.lower()}: ")

        cro = ""
        especialidade = ""
        if tipo_contato == "DENTISTA":
            cro = ler_cro()
            especialidade = ler_texto("Especialidade do dentista: ")

        inserir_contato(
            tipo_contato,
            nome,
            tipo_documento,
            numero_documento,
            email,
            cep,
            cro,
            especialidade
        )

    except Exception as e:
        print(f"Erro no cadastro de contato: {e}")

#pega todos os contatos de um tipo dentro da tabela
def listar_todos_contatos(tipo_contato):
    try:
        contatos = listar_contatos(tipo_contato)
        if not contatos:
            print(f"Nenhum {tipo_contato.lower()} encontrado.")
            return

        for contato in contatos:
            print(contato)
    except Exception as e:
        print(f"Erro ao listar contatos: {e}")

#recebe o ID de um contato do nosso usuário, procura na tabela e atualiza os dados
def alterar_contato(tipo_contato):
    try:
        id_contato = int(input(f"ID do {tipo_contato.lower()} a alterar: "))
        contato = buscar_contato_por_id(id_contato)

        if not contato:
            print("Contato não encontrado.")
            return

        nome = ler_texto(f"Novo nome do {tipo_contato.lower()}: ")
        tipo_documento = ler_tipo_documento()
        numero_documento = ler_numero_documento()
        email = ler_email(f"Novo e-mail do {tipo_contato.lower()} (ou Enter para vazio): ")
        cep = ler_cep(f"Novo CEP do {tipo_contato.lower()}: ")

        cro = ""
        especialidade = ""
        if tipo_contato == "DENTISTA":
            cro = ler_cro()
            especialidade = ler_texto("Nova especialidade do dentista: ")

        atualizar_contato(
            id_contato,
            tipo_contato,
            nome,
            tipo_documento,
            numero_documento,
            email,
            cep,
            cro,
            especialidade
        )

    except ValueError:
        print("ID inválido.")
    except Exception as e:
        print(f"Erro ao alterar contato: {e}")

#pega o ID do contato e remove o contato todo da tabela
def remover_contato(tipo_contato):
    try:
        id_contato = int(input(f"ID do {tipo_contato.lower()} a remover: "))
        excluir_contato(id_contato)
    except ValueError:
        print("ID inválido.")
    except Exception as e:
        print(f"Erro ao remover contato: {e}")

#acha um contato por número do documento dele
def consulta_contato_por_numero_documento():
    try:
        numero_documento = ler_numero_documento()
        dados = consultar_contato_por_numero_documento(numero_documento)

        if not dados:
            print("Nenhum contato encontrado para esse documento.")
            return

        for item in dados:
            print(item)

        exportar = input("Deseja exportar para JSON? (s/n): ").strip().lower()
        if exportar == "s":
            exportar_json("consulta_por_numero_documento.json", dados)

    except Exception as e:
        print(f"Erro na consulta por número de documento: {e}")

#acha todos os contatos que possuem o tipo de documento providenciado
def consulta_contato_por_tipo_documento():
    try:
        tipo_documento = ler_tipo_documento()
        dados = consultar_contato_por_tipo_documento(tipo_documento)

        if not dados:
            print("Nenhum contato encontrado para esse tipo de documento.")
            return

        for item in dados:
            print(item)

        exportar = input("Deseja exportar para JSON? (s/n): ").strip().lower()
        if exportar == "s":
            exportar_json("consulta_por_tipo_documento.json", dados)

    except Exception as e:
        print(f"Erro na consulta por tipo de documento: {e}")

#consulta um endereco usando a API publica ViaCEP
def consultar_endereco_por_cep():
    try:
        cep = ler_cep("CEP para consulta na API ViaCEP: ")
        endereco = consultar_cep_viacep(cep)

        if not endereco:
            print("CEP nao encontrado na base do ViaCEP.")
            return

        print("\n=== ENDERECO ENCONTRADO ===")
        print(f"CEP: {endereco['cep']}")
        print(f"Logradouro: {endereco['logradouro']}")
        print(f"Complemento: {endereco['complemento']}")
        print(f"Bairro: {endereco['bairro']}")
        print(f"Cidade: {endereco['localidade']}")
        print(f"UF: {endereco['uf']}")
        print(f"Estado: {endereco['estado']}")
        print(f"Regiao: {endereco['regiao']}")
        print(f"IBGE: {endereco['ibge']}")
        print(f"DDD: {endereco['ddd']}")

    except ValueError as e:
        print(e)
    except Exception as e:
        print(f"Erro ao consultar API externa ViaCEP: {e}")
