import oracledb

#conecta no (meu, thiago) banco de dados
def conectar():
    try:
        conexao = oracledb.connect(
            user="rm567630",
            password="150101",
            dsn="oracle.fiap.com.br/orcl"
        )
        return conexao
    except Exception as e:
        print(f"Erro ao conectar com o banco: {e}")
        return None
