from contato_service import (
    cadastrar_contato,
    listar_todos_contatos,
    alterar_contato,
    remover_contato,
    consulta_contato_por_numero_documento,
    consulta_contato_por_tipo_documento,
    consultar_endereco_por_cep
)
from contato_dao import criar_tabela_contato

#o menu principal funcional do código
def menu_principal():
    while True:
        print("\n=== SISTEMA TURMA DO BEM ===")
        print("1. Menu CRUD de Contatos")
        print("2. Menu Consultas")
        print("0. Sair")

        opcao = input("Escolha uma opção: ").strip()

        if opcao == "1":
            menu_tipo_contato()
        elif opcao == "2":
            menu_consultas()
        elif opcao == "0":
            print("Saindo..")
            break
        else:
            print("Opção inválida.")

#menu para escolher o tipo do contato
def menu_tipo_contato():
    while True:
        print("\n=== ESCOLHA O TIPO DE CONTATO ===")
        print("1. Paciente")
        print("2. Doador")
        print("3. Solicitante")
        print("4. Dentista")
        print("0. Voltar")

        opcao = input("Escolha uma opção: ").strip()

        if opcao == "1":
            menu_crud_contato("PACIENTE")
        elif opcao == "2":
            menu_crud_contato("DOADOR")
        elif opcao == "3":
            menu_crud_contato("SOLICITANTE")
        elif opcao == "4":
            menu_crud_contato("DENTISTA")
        elif opcao == "0":
            break
        else:
            print("Opção inválida.")

#menu de CRUD do contato
def menu_crud_contato(tipo_contato):
    while True:
        print(f"\n=== MENU {tipo_contato} ===")
        print(f"1. Cadastrar {tipo_contato.lower()}")
        print(f"2. Listar {tipo_contato.lower()}s")
        print(f"3. Alterar {tipo_contato.lower()}")
        print(f"4. Excluir {tipo_contato.lower()}")
        print("0. Voltar")

        opcao = input("Escolha uma opção: ").strip()

        if opcao == "1":
            cadastrar_contato(tipo_contato)
        elif opcao == "2":
            listar_todos_contatos(tipo_contato)
        elif opcao == "3":
            alterar_contato(tipo_contato)
        elif opcao == "4":
            remover_contato(tipo_contato)
        elif opcao == "0":
            break
        else:
            print("Opção inválida.")

#menu de consultas
def menu_consultas():
    while True:
        print("\n=== CONSULTAS ===")
        print("1. Consultar contato por número do documento")
        print("2. Consultar contatos por tipo de documento")
        print("3. Consultar endereco por CEP (API ViaCEP)")
        print("0. Voltar")

        opcao = input("Escolha uma opção: ").strip()

        if opcao == "1":
            consulta_contato_por_numero_documento()
        elif opcao == "2":
            consulta_contato_por_tipo_documento()
        elif opcao == "3":
            consultar_endereco_por_cep()
        elif opcao == "0":
            break
        else:
            print("Opção inválida.")


if __name__ == "__main__":
    criar_tabela_contato()
    menu_principal()
