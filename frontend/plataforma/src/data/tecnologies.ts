export interface Technology {
  id: string;
  name: string;
  desc: string;
  icon: string;
  labels: string[];
  fileName: string;
}

export const technologiesData: Technology[] = [
  { 
    id: "react",
    name: "React", 
    fileName: "App.tsx",
    desc: "Biblioteca líder para construção de interfaces de usuário modernas, baseada em componentes reutilizáveis e estados reativos.", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    labels: ["Frontend", "Componentização", "SPA"]
  },
  { 
    id: "tailwind",
    name: "TailwindCSS", 
    fileName: "tailwind.config.js",
    desc: "Framework CSS que permite estilização rápida e responsiva diretamente no HTML, garantindo performance e consistência visual.", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    labels: ["Design", "Responsividade", "Performance"]
  },
  { 
    id: "python",
    name: "Python", 
    fileName: "main.py",
    desc: "Linguagem poderosa utilizada para automação de fluxos, scripts de inteligência e processamento de dados do backend.", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    labels: ["Automação", "Scripts", "Back-end"]
  },
  { 
    id: "java",
    name: "Java", 
    fileName: "Service.java",
    desc: "Utilizado para garantir uma estrutura de backend robusta, segura e escalável, ideal para sistemas de gestão de alto volume.", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    labels: ["Robustez", "Enterprise", "Segurança"]
  },
  { 
    id: "oracle",
    name: "Oracle SQL", 
    fileName: "database.sql",
    desc: "Sistema de gerenciamento de banco de dados relacional para armazenamento seguro e consultas complexas de todos os tickets e contatos.", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
    labels: ["Database", "SQL", "Integridade"]
  },
  { 
    id: "colab",
    name: "Google Colab", 
    fileName: "research.ipynb",
    desc: "Ambiente baseado em nuvem utilizado para prototipagem de algoritmos de análise de dados e testes de Machine Learning.", 
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg",
    labels: ["Data Science", "Cloud", "Prototipagem"]
  },
  { 
    id: "astah",
    name: "Astah", 
    fileName: "modeling.astah",
    desc: "Ferramenta fundamental na fase de design do sistema para modelagem UML, diagramas de caso de uso e de atividade e arquitetura de software.", 
    icon: "https://astah.net/wp-content/uploads/2019/07/Astah_blue.svg",
    labels: ["UML", "Modelagem", "Arquitetura"]
  },
  { 
    id: "js",
    name: "JavaScript", 
    fileName: "utils.js",
    desc: "A base da interatividade da plataforma, garantindo que a experiência do usuário seja fluida e dinâmica em todos os navegadores.", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    labels: ["Interatividade", "ES6+", "Fullstack"]
  }
];