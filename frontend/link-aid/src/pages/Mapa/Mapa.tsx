import { Link } from "react-router-dom";
import HeroDefault from "../../Layout/HeroDefault";
import {
  Home,
  Info,
  Users,
  Lightbulb,
  HelpCircle,
  Mail,
  Map,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

const pages = [
  {
    name: "Home",
    path: "/",
    icon: <Home size={20} />,
    desc: "Página inicial do projeto.",
  },
  {
    name: "Sobre",
    path: "/sobre",
    icon: <Info size={20} />,
    desc: "Conheça nossa missão e valores.",
  },
  {
    name: "Equipe",
    path: "/equipe",
    icon: <Users size={20} />,
    desc: "Quem faz o LinkAid acontecer.",
  },
  {
    name: "Solução",
    path: "https://link-aid-site.lovable.app",
    icon: <Lightbulb size={20} />,
    desc: "Nossa tecnologia e impacto social.",
    isExternal: true,
  },
  {
    name: "FAQ",
    path: "/faq",
    icon: <HelpCircle size={20} />,
    desc: "Dúvidas frequentes e suporte.",
  },
  {
    name: "Contato",
    path: "/contato",
    icon: <Mail size={20} />,
    desc: "Fale diretamente conosco.",
  },
  {
    name: "Mapa do Site",
    path: "/mapa",
    icon: <Map size={20} />,
    desc: "Estrutura completa de navegação.",
  },
];

const Mapa = () => {
  return (
    <>
      <main className="w-full bg-white dark:bg-slate-950">
        <HeroDefault
          titleBlack="Explore toda"
          titleBlue="nossa estrutura."
          description="Navegue por todas as seções do LinkAid. Aqui você encontra um guia completo de nossas páginas para facilitar sua experiência de navegação."
          scrollText="Ver mapa"
          ScrollIcon={Map}
          highlightWord="completo"
        />

        {/* -mt-16 e relative z-20 para colar na hero no mobile */}
        <section className="max-w-[1300px] mx-auto px-6 -mt-16 md:mt-0 pt-0 pb-20 md:py-20 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => {
              // Sombra shadow-2xl com opacidade alta para não ficar "claro"
              // items-center e text-center no mobile
              const commonClasses =
                "group p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl shadow-slate-300/80 dark:shadow-black/40 hover:shadow-blue-500/30 transition-all duration-500 flex flex-col items-center text-center lg:items-start lg:text-left gap-4";

              const CardContent = (
                <>
                  <div className="flex items-center justify-between w-full">
                    {/* Icone centralizado no mobile com mx-auto */}
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 mx-auto lg:mx-0">
                      {page.icon}
                    </div>
                    {/* Seta escondida no mobile para manter foco na centralização */}
                    <div className="hidden lg:block">
                      {page.isExternal ? (
                        <ExternalLink
                          size={16}
                          className="text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-all"
                        />
                      ) : (
                        <ChevronRight
                          size={18}
                          className="text-slate-300 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
                        />
                      )}
                    </div>
                  </div>
                  <div className="w-full">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                      {page.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                      {page.desc}
                    </p>
                  </div>
                </>
              );

              return page.isExternal ? (
                <a
                  key={page.name}
                  href={page.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={commonClasses}
                >
                  {CardContent}
                </a>
              ) : (
                <Link key={page.path} to={page.path} className={commonClasses}>
                  {CardContent}
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default Mapa;