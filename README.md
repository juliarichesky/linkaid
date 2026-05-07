<div align="center">
<img src="frontend/link-aid/src/assets/icons/logo-em-pe.png" width="500px;" alt="Logo do LinkAid"/><br>
   
## Plataforma de Atendimento Inteligente e Humanizada  
Centralize, automatize e escale o atendimento sem perder o toque humano.

[![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow.svg)](#)

🔗 **Acesse o repositório:**  
👉 https://github.com/juliarichesky/linkaid

🔗 **Acesse o vídeo:**  
👉 https://youtu.be/IK4B1GOjPhk
  
<br>

  <img src="frontend/link-aid/src/assets/images/painel/dashboard.png" alt="Interface do LinkAid" width="100%">

</div>

<br/>

---

<br/>

## 💡 Sobre o Projeto

O **LinkAid** é uma plataforma de **atendimento inteligente e humanizado**, projetada para centralizar, organizar e otimizar a comunicação entre organizações e seus públicos.

Em cenários com múltiplos canais de contato (como e-mail, WhatsApp, Instagram e formulários), é comum enfrentar:

- ❌ Perda de mensagens importantes  
- ⏳ Demora no atendimento  
- ⚠️ Sobrecarga operacional com triagens manuais  

O LinkAid resolve esse problema ao transformar todas as interações em um **fluxo estruturado e rastreável**, através de um sistema de **ticketing inteligente com automação de processos**.

> 💡 Embora possa ser aplicado em contextos como ONGs (ex: gestão de doadores, voluntários e beneficiários), o LinkAid foi concebido como uma solução **flexível**, capaz de atender diferentes tipos de organizações que lidam com alto volume de comunicação.

<br/>

## 🎯 Proposta do Projeto

O objetivo do LinkAid é unir:

- 🤖 **Eficiência tecnológica** (automação, IA, organização de dados)  
- ❤️ **Cuidado humano** (atendimento empático e personalizado)  

Criando um modelo de atendimento **híbrido, escalável e estratégico**.

<br/>

## ✨ Funcionalidades Principais

| Funcionalidade | Descrição |
| :--- | :--- |
| 📊 Dashboard Centralizado | Visualização em tempo real de todas as interações |
| 🎫 Ticketing Inteligente | Criação automática de tickets com histórico |
| ⚙️ Automação de Fluxos | Regras inteligentes de triagem e encaminhamento |
| 👥 Base de Contatos | Histórico completo de usuários |
| 📈 Relatórios e Insights | Métricas estratégicas de atendimento |
| 🧠 Classificação com IA | Identificação automática de tipo de usuário e intenção da mensagem |
| 🔔 Notificações em Tempo Real | Alertas sobre novos tickets e atualizações importantes |
| 🏷️ Gestão de Status e Prioridade | Organização de atendimentos por nível de urgência |
| 🔍 Filtros e Busca Avançada | Localização rápida de tickets e contatos |
| 📜 Histórico Completo de Atendimentos | Rastreamento detalhado de todas as interações |
| 🔗 Integração com Múltiplos Canais | Centralização de mensagens de diferentes plataformas |
| 👤 Atribuição de Responsáveis | Distribuição automática ou manual de tickets entre usuários |
| 📱 Interface Responsiva | Acesso completo via desktop e dispositivos móveis |
| 💰 Módulo Financeiro | Gestão de dados financeiros relacionados aos atendimentos |
| 📎 Registro de Informações Adicionais | Inclusão de observações e dados complementares nos tickets |

<br/>

## 🚀 Conheça o LinkAid

<table>
<tr>
<td width="50%">

### 📊 Relatórios  
Visualize métricas e dados de atendimentos para monitoramento e melhoria contínua.

</td>
<td width="50%">
<img src="frontend/link-aid/src/assets/images/painel/relatorios.png" style="border-radius: 10px;">
</td>
</tr>

<tr>
<td width="50%">
<img src="frontend/link-aid/src/assets/images/painel/tickets.png" style="border-radius: 10px;">
</td>
<td width="50%">

### 🎫 Gestão de Tickets  
Gerencie atendimentos com status, responsáveis e histórico completo.

</td>
</tr>

<tr>
<td width="50%">

### ➕ Criação de Tickets  
Registre novas solicitações de forma rápida e estruturada.

</td>
<td width="50%">
<img src="frontend/link-aid/src/assets/images/painel/criar-ticket.png" style="border-radius: 10px;">
</td>
</tr>

<tr>
<td width="50%">
<img src="frontend/link-aid/src/assets/images/painel/historico.png" style="border-radius: 10px;">
</td>
<td width="50%">

### 📜 Histórico Completo  
Acompanhe todo o ciclo de atendimento com rastreabilidade total.

</td>
</tr>

<tr>
<td width="50%">

### 💰 Módulo Financeiro  
Controle financeiro integrado à plataforma.

</td>
<td width="50%">
<img src="frontend/link-aid/src/assets/images/painel/financeiro-desktop.png" style="border-radius: 10px;">
</td>
</tr>

</table>

<br/>

 ## ⚙️ Como o Sistema Funciona

O LinkAid foi projetado como uma arquitetura modular, onde cada componente possui uma responsabilidade específica dentro do fluxo de atendimento.

### 🔄 Fluxo Geral

1. 📩 **Entrada de Dados**  
   As mensagens chegam por diferentes canais (ex: formulários, e-mail e integrações externas).

2. 🧠 **Processamento Inteligente (Python + IA)**
   O backend em Python analisa o conteúdo utilizando técnicas de NLP para:
   - identificar a intenção  
   - classificar o tipo de usuário  
   - sugerir direcionamentos  

3. ☕ **Orquestração e Regras de Negócio (Java)**
   A camada Java:
   - registra doações  
   - cria e gerencia tickets  
   - define prioridades e responsáveis

4. 🎫 **Sistema de Ticketing** (Não implementado nessa sprint)
   Cada interação se torna um ticket com:
   - status  
   - histórico  
   - rastreabilidade  

5. 🎨 **Interface do Usuário (Frontend)**
   Permite:
   - visualizar tickets  
   - responder solicitações  
   - acompanhar métricas
   - criar tickets manualmente
   - visualizar cadastros

6. 🗄️ **Persistência de Dados (Database)**
   Garante:
   - armazenamento seguro  
   - histórico completo  
   - suporte a relatórios 

---

### 🧩 Integração entre os Módulos (Não implementado nessa sprint)

- Frontend → Java API  
- Java → Python (IA)  
- Java → Database  
- Python → Java  

> Arquitetura modular que permite escalabilidade e manutenção independente.

---

### 🚀 Por que essa arquitetura?

- 🔹 Escalável  
- 🔹 Flexível  
- 🔹 Inteligente  
- 🔹 Organizada  

> O LinkAid é uma plataforma pensada para evolução contínua. 

<br/>

## 🌍 Exemplos de Aplicação

O LinkAid pode ser utilizado em diversos contextos:

- 🏥 ONGs e projetos sociais  
- 🏢 Empresas com atendimento ao cliente  
- 🎓 Instituições educacionais  
- 📞 Centrais de suporte  

<br/>

## 🌉 O Significado do Nome

**LinkAid = Link + Aid**

- **Link:** conexão entre pessoas, demandas e soluções  
- **Aid:** ajuda, assistência  

> Uma ponte inteligente entre quem precisa e quem pode ajudar.

<br/>

## 🏗️ Estrutura do Projeto

```text
LinkAid/
├── front-end/
│   └── link-aid/                # Projeto React
│       ├── public/              # Arquivos estáticos acessíveis diretamente
│       ├── src/
│       │   ├── assets/          # Imagens, ícones, etc.
│       │   ├── components/      # Componentes reutilizáveis
│       │   ├── data/            # Dados / JSON / constantes
│       │   ├── layout/          # Estruturas base de página (layouts)
│       │   ├── pages/           # Páginas (rotas)
│       │   ├── App.tsx          # Rotas e estrutura principal
│       │   ├── index.css        # Tailwind + estilos globais
│       │   └── main.tsx         # Entry point
│       ├── package.json         # Configurações React + TypeScript + Vite
│       ├── tsconfig.json
│       └── vite.config.ts       
├── java/             # Criação e gereciamento de tickets (JDBC)
├── python/           # CRUD de pessoas (OracleDB), FastAPI
├── database/         # Modelagem e scripts SQL
├── business-model/   # Documentação e diagramas
└── ia-chatbot/       # Análise exploratória de dados
``` 

<br/>

## 🛠️ Tecnologias Utilizadas

### 🎨 Frontend
- VITE
- React  
- TypeScript  
- TailwindCSS
- Visual Studio Code

### ☕ Backend (Java)
- Java 17+  
- Maven  

### 🐍 Backend (Python)
- FastAPI
- OracleDB

### 🗄️ Banco de Dados
- Oracle SQL    

### 🤖 Inteligência Artificial
- Python 
- Pandas
- Protly Express
- Google Colab

<br/>

## 🚀 Como Executar

Siga os passos abaixo para executar o projeto localmente:

### 📥 Clonando o repositório
```bash
git clone https://github.com/juliarichesky/linkaid.git
cd LinkAid
```

<br/>

### ▶️ Frontend

```bash
cd front-end
npm install
npm run dev
```

O frontend estará disponível em:
👉 http://localhost:5173

<br/>

### ▶️ Python

```bash
cd python\cs3_contato
python main.py
```

<br/>

### ▶️ Java

```bash
cd java\cs3_ticket
mvn -q exec:java -Dexec.mainClass=com.turmadobem.MainTeste
```


<br/>

## 🤝 Contribuidores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/juliarichesky">
        <img src="frontend/link-aid/src/assets/images/team/julia-guimaraes.png" width="200px;" style="border-radius: 50%;" alt="Julia Guimarães"/><br>
        <sub><b>Julia Guimarães</b></sub>
      </a><br>
      RM: 568275<br>
      Turma: 1TDSPA<br><br>
      <a href="https://www.linkedin.com/in/juliarichesky/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
      </a>
      <a href="https://github.com/juliarichesky">
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/juspanopoulos">
        <img src="frontend/link-aid/src/assets/images/team/julia-spanopoulos.png" width="200px;" style="border-radius: 50%;" alt="Julia Spanopoulos"/><br>
        <sub><b>Julia Spanopoulos</b></sub>
      </a><br>
      RM: 566754<br>
      Turma: 1TDSPA<br><br>
      <a href="https://www.linkedin.com/in/juspanopoulos/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
      </a>
      <a href="https://github.com/juspanopoulos">
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
      </a>
    </td>
  </tr>
</table>

<br/>

## 📬 Contato da Equipe
Caso tenha dúvidas ou sugestões:

📧 **Julia Guimarães:** juliavaleriogs@gmail.com
<br/>
📧 **Julia Spanopoulos:** jusspan@gmail.com
<br/>

[![GitHub](https://img.shields.io/badge/GitHub-Repositório-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/juliarichesky/linkaid)
