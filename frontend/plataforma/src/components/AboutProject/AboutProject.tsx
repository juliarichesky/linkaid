import { ArrowRight, Globe, ShieldCheck, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { platformPath } from "@/routes/platform";
import "../../index.css";

const AboutProject = () => {
  return (
    /* padding and section alignment to match aboutmeaning*/
    <section className="w-full pt-20 pb-12 lg:pt-32 lg:pb-30 bg-white dark:bg-slate-950 relative">
      <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* left side: concept */}
          <div className="flex flex-col text-left lg:text-left order-1">
            <div className="flex flex-col gap-4 mb-10 items-center lg:items-start">
              {/* title: using the exact same fluid scale and line height */}
              <h2 className="text-[12vw] sm:text-[9vw] md:text-[6vw] lg:text-[4.5vw] font-bold text-slate-950 dark:text-white tracking-tighter leading-[0.85] md:leading-[0.85] lg:leading-[0.8] text-center lg:text-left">
                Simples. <br className="lg:hidden" />
                <span className="text-blue-600 font-light ml-2 lg:ml-0">
                  Conectado.
                </span>
              </h2>

              {/* paragraph: matching aboutmeaning mt and max-w */}
              <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed tracking-tight max-w-[480px] mx-auto lg:mx-0 text-center lg:text-left mt-4">
                Nossa essência é facilitar o dia a dia, eliminando barreiras
                para que você foque no que realmente importa.
              </p>
            </div>

            {/* technical features grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-2">
              {[
                {
                  icon: <Target size={22} />,
                  title: "Escalabilidade",
                  desc: "Feito para crescer junto com você.",
                },
                {
                  icon: <ShieldCheck size={22} />,
                  title: "Segurança",
                  desc: "Proteção moderna para seus dados.",
                },
                {
                  icon: <Globe size={22} />,
                  title: "Para Todos",
                  desc: "Interface intuitiva e acessível.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left group cursor-default"
                >
                  {/* icon */}
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 shadow-sm transition-all duration-500 group-hover:border-blue-200 group-hover:text-blue-600 group-hover:shadow-[0_10px_25px_-5px_rgba(37,99,235,0.1)] group-hover:-translate-y-1 mb-5 mx-auto lg:mx-0">
                    {item.icon}
                  </div>

                  {/* title */}
                  <h4 className="text-[11px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-[0.25em] mb-2 transition-colors duration-300 group-hover:text-blue-600 mx-auto lg:mx-0">
                    {item.title}
                  </h4>

                  {/* description */}
                  <p className="text-slate-500 dark:text-slate-400 text-[14px] leading-relaxed font-light tracking-tight max-w-[200px] lg:max-w-none mx-auto lg:mx-0">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* right side: manifesto card */}
          <div className="flex flex-col w-full order-2">
            <div className="relative p-8 lg:p-12">
              <div className="relative">
                <p className="text-xl lg:text-3xl font-semibold text-slate-800 dark:text-slate-200 leading-[1] tracking-[-0.04em] mb-8 text-center lg:text-left">
                  Desenhamos cada detalhe pensando em{" "}
                  <span className="text-blue-600">clareza</span>,{" "}
                  <span className="text-blue-600">segurança</span> e
                  acessibilidade.
                </p>
                <div className="h-[1px] w-full bg-slate-100 dark:bg-slate-800 mb-8" />
                <p className="text-slate-500 dark:text-slate-400 text-sm lg:text-lg font-light leading-relaxed tracking-tight text-center lg:text-left">
                  Criamos uma estrutura inteligente que organiza dados
                  espalhados em informações claras. Um ambiente seguro e fluido,
                  desenhado para acompanhar o ritmo do seu dia a dia.
                </p>

                {/* cta button */}
                <div className="flex justify-center lg:justify-start pt-8">
                  <Link
                    to={platformPath("/")}
                    className="flex items-center gap-3 text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] group cursor-pointer"
                  >
                    Acessar Painel
                    <div className="w-10 h-10 rounded-full border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <ArrowRight size={14} />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
