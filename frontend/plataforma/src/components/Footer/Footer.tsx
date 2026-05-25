import { Link } from "react-router-dom";
import {
  Camera,
  GitFork,
  Code,
  Heart,
  ChevronUp,
  MapPin,
  Globe,
  Home,
  Info,
  Users,
  Lightbulb,
  HelpCircle,
  Mail,
} from "lucide-react";
import logo from "../../assets/icons/logo.png?url";
import { platformPath } from "@/routes/platform";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full px-4 md:px-10 pb-0 mt-20 font-sans">
      <div className="max-w-[2000px] mx-auto bg-white/10 dark:bg-slate-950/70 backdrop-blur-xl border border-white/20 dark:border-blue-400/15 p-8 md:p-12 shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.25)] rounded-t-[3rem] rounded-b-none border-b-0">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="col-span-1 lg:col-span-2 flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left">
            <Link
              to="/"
              className="cursor-pointer transition-opacity hover:opacity-80"
            >
              <img
                src={logo}
                alt="LinkAid"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 leading-relaxed max-w-[280px]">
              Unindo propósitos e simplificando a{" "}
              <span className="text-blue-500">gestão social</span> com
              inteligência e inovação.
            </p>

            <div className="flex flex-col items-center lg:items-start gap-3 pt-2">
              <div className="flex items-center justify-center lg:justify-start gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 w-full">
                <MapPin size={12} className="text-blue-500" /> São Paulo, Brasil
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 w-full">
                <Globe size={12} className="text-green-500" /> Disponível
                Globalmente
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 w-full">
                <Mail size={12} className="text-blue-500" /> contato@linkaid.com
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2 grid grid-cols-2 gap-8 w-full">
            <div className="flex flex-col items-center lg:items-start gap-5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">
                Navegar
              </h3>
              <nav className="flex flex-col items-center lg:items-start gap-4">
                {[
                  {
                    label: "Início",
                    path: "/",
                    icon: <Home size={14} />,
                    external: false,
                  },
                  {
                    label: "Sobre",
                    path: "/sobre",
                    icon: <Info size={14} />,
                    external: false,
                  },
                  {
                    label: "Equipe",
                    path: "/equipe",
                    icon: <Users size={14} />,
                    external: false,
                  },
                  {
                    label: "Solução",
                    path: platformPath("/"),
                    icon: <Lightbulb size={14} />,
                    external: false,
                  },
                  {
                    label: "FAQ",
                    path: "/faq",
                    icon: <HelpCircle size={14} />,
                    external: false,
                  },
                  {
                    label: "Contato",
                    path: "/contato",
                    icon: <Mail size={14} />,
                    external: false,
                  },
                ].map((item) => {
                  const linkClasses =
                    "group flex flex-row items-center gap-3 text-[13px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-all tracking-tight w-[110px] lg:w-full";
                  const iconWrapperClasses =
                    "flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 dark:bg-slate-900/40 border border-white/10 dark:border-blue-400/10 hover:text-blue-500 transition-all";

                  // se for externo, renderiza a tag <a>
                  if (item.external) {
                    return (
                      <a
                        key={item.label}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClasses}
                      >
                        <span className={iconWrapperClasses}>{item.icon}</span>
                        <span className="whitespace-nowrap">{item.label}</span>
                      </a>
                    );
                  }

                  // se for interno, mantém o <Link>
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      className={linkClasses}
                    >
                      <span className={iconWrapperClasses}>{item.icon}</span>
                      <span className="whitespace-nowrap">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex flex-col items-center lg:items-start gap-5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500">
                Conectar
              </h3>
              <div className="flex flex-col items-center lg:items-start gap-4">
                {[
                  { icon: <Camera size={14} />, label: "Instagram", url: "#" },
                  { icon: <GitFork size={14} />, label: "LinkedIn", url: "#" },
                  {
                    icon: <Code size={14} />,
                    label: "GitHub",
                    url: "https://github.com/juliarichesky/linkaid",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-row items-center gap-3 text-[13px] font-medium text-slate-500 dark:text-slate-400 hover:text-green-500 transition-all w-[110px] lg:w-full"
                  >
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 dark:bg-slate-900/40 border border-white/10 dark:border-blue-400/10 hover:text-green-500 transition-all">
                      {social.icon}
                    </span>
                    <span className="whitespace-nowrap">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* button */}
          <div className="col-span-1 flex flex-col items-center lg:items-end justify-center lg:h-full py-8 lg:py-0">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-4 px-6 py-3 rounded-full bg-slate-900/5 border border-slate-950/10 dark:border-slate-700 hover:bg-blue-600 hover:border-blue-600 transition-all duration-500 shadow-sm hover:shadow-blue-500/20 cursor-pointer"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 group-hover:text-white transition-colors">
                Topo
              </span>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg group-hover:bg-white dark:group-hover:bg-slate-900 group-hover:text-blue-600 transition-all">
                <ChevronUp size={16} />
              </div>
            </button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 text-center lg:text-left">
            <div className="flex flex-col sm:flex-row gap-6 lg:gap-12">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
                  Desenvolvedoras
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Julia Guimarães • Julia Spanopoulos
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
                  Designer
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-tight">
                  Julia Guimarães
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-6">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 bg-white/5 dark:bg-slate-900/40 px-4 py-2 rounded-full border border-white/10 dark:border-blue-400/10 font-bold text-[11px]">
                © {currentYear} • FEITO COM{" "}
                <Heart
                  size={10}
                  className="fill-red-500 text-red-500 animate-pulse"
                />{" "}
                ||
                <Link
                  to="/mapa"
                  className="hover:text-blue-500 transition ml-2"
                >
                  MAPA DO SITE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
