import json
import urllib.error
import urllib.request


def consultar_cep_viacep(cep):
    cep_limpo = cep.strip().replace("-", "")

    if not cep_limpo.isdigit() or len(cep_limpo) != 8:
        raise ValueError("CEP invalido. Digite exatamente 8 numeros.")

    url = f"https://viacep.com.br/ws/{cep_limpo}/json/"

    try:
        with urllib.request.urlopen(url, timeout=10) as resposta:
            dados = json.loads(resposta.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"Erro HTTP ao consultar ViaCEP: {e.code}") from e
    except urllib.error.URLError as e:
        raise RuntimeError(f"Erro de conexao ao consultar ViaCEP: {e.reason}") from e
    except json.JSONDecodeError as e:
        raise RuntimeError("Resposta invalida recebida da API ViaCEP.") from e

    if dados.get("erro"):
        return None

    return {
        "cep": dados.get("cep", ""),
        "logradouro": dados.get("logradouro", ""),
        "complemento": dados.get("complemento", ""),
        "bairro": dados.get("bairro", ""),
        "localidade": dados.get("localidade", ""),
        "uf": dados.get("uf", ""),
        "estado": dados.get("estado", ""),
        "regiao": dados.get("regiao", ""),
        "ibge": dados.get("ibge", ""),
        "ddd": dados.get("ddd", ""),
    }
