import HomeFinalShowCase from "@/components/HomeFinalShowCase/HomeFinalShowCase";
import HomeLayout from "@/layouts/HomeLayout";
import { Link2, BarChart3, Rocket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { platformPath } from "@/routes/platform";

const Home = () => {
  return (
    <>
      <HomeLayout>
        <div className="relative w-full overflow-hidden mt-[-50px] bg-white dark:bg-slate-950">
          <div className="absolute left-6 md:left-16 top-0 bottom-0 w-[2px] z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-green-500 to-indigo-700 opacity-20"></div>
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white dark:from-slate-950 via-white/80 dark:via-slate-950/80 to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-slate-950 via-white/80 dark:via-slate-950/80 to-transparent z-10"></div>
          </div>

          <div className="relative z-10 flex flex-col px-4 sm:px-8 md:px-8 max-w-[1400px] mx-auto">
            {/* connections */}
            <section
              id="sec1"
              className="relative min-h-0 sm:min-h-[80vh] md:min-h-[80vh] flex items-start sm:items-center md:items-center pl-8 sm:pl-20 md:pl-20 group py-20 sm:pt-32 md:pt-32"
            >
              <div className="absolute z-20 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-[3px] border-blue-600 shadow-lg transition-all duration-500 group-hover:scale-125 top-1/2 -translate-y-1/2 left-[0px] sm:left-[-15px] md:left-[25px] lg:left-[25px] xl:left-[25px]"></div>

              <div className="w-full transition-all duration-700 md:group-hover:-translate-y-2 p-8 sm:p-12 md:p-12 max-w-xl sm:max-w-[650px] md:max-w-[650px]">
                <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-10 gap-4 sm:gap-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/45 text-blue-600 flex items-center justify-center shadow-inner transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Link2 size={24} strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                    ORGANIZAÇÃO
                  </span>
                </header>

                <h2 className="text-3xl md:text-4xl font-semibold text-slate-950 dark:text-white mb-6 tracking-tight leading-tight">
                  Conexões <br />
                  <span className="text-blue-600 font-normal">
                    Centralizadas
                  </span>
                </h2>

                <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed tracking-tight mb-10 max-w-[480px]">
                  Chega de informações espalhadas em várias planilhas. Unimos
                  todas as partes do seu projeto em um único lugar.
                </p>

                <Link
                  to={platformPath("/")}
                  className="flex items-center gap-4 text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] group/btn cursor-pointer"
                >
                  Explorar Solução
                  <div className="w-10 h-10 rounded-full border border-blue-100 flex items-center justify-center group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-all shadow-sm">
                    <ArrowRight size={14} />
                  </div>
                </Link>
              </div>
            </section>

            {/* sec 2 - results */}
            <section
              id="sec2"
              className="relative min-h-0 sm:min-h-[80vh] md:min-h-[80vh] flex items-start sm:items-center md:items-center pl-8 sm:pl-20 md:pl-20 group py-20 sm:pt-32 md:pt-32"
            >
              <div className="absolute z-20 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-[3px] border-green-500 shadow-lg transition-all duration-500 group-hover:scale-125 top-1/2 -translate-y-1/2 left-[0px] sm:left-[-15px] md:left-[25px] lg:left-[25px] xl:left-[25px]"></div>

              <div className="w-full transition-all duration-700 md:group-hover:-translate-y-2 p-8 sm:p-12 md:p-12 max-w-xl sm:max-w-[650px] md:max-w-[650px]">
                <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-10 gap-4 sm:gap-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-green-50 dark:bg-green-950/45 text-green-600 flex items-center justify-center shadow-inner transition-colors group-hover:bg-green-500 group-hover:text-white">
                    <BarChart3 size={24} strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                    RESULTADOS
                  </span>
                </header>

                <h2 className="text-3xl md:text-4xl font-semibold text-slate-950 dark:text-white mb-6 tracking-tight leading-tight">
                  Impacto <br />
                  <span className="text-green-500 font-normal">Visual</span>
                </h2>

                <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed tracking-tight mb-10 max-w-[480px]">
                  Mostramos o resultado real do seu trabalho com gráficos
                  intuitivos e dados que contam uma história clara.
                </p>

                <Link
                  to={platformPath("/")}
                  className="flex items-center gap-4 text-green-600 font-bold text-[10px] uppercase tracking-[0.2em] group/btn cursor-pointer"
                >
                  Conhecer Painel
                  <div className="w-10 h-10 rounded-full border border-green-100 flex items-center justify-center group-hover/btn:bg-green-500 group-hover/btn:text-white transition-all shadow-sm">
                    <ArrowRight size={14} />
                  </div>
                </Link>
              </div>
            </section>

            {/* sec 3 - tech */}
            <section
              id="sec3"
              className="relative min-h-0 sm:min-h-[80vh] md:min-h-[80vh] flex items-start sm:items-center md:items-center pl-8 sm:pl-20 md:pl-20 group py-20 sm:pt-32 md:pt-32"
            >
              <div className="absolute z-20 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-[3px] border-indigo-700 shadow-lg transition-all duration-500 group-hover:scale-125 top-1/2 -translate-y-1/2 left-[0px] sm:left-[-15px] md:left-[25px] lg:left-[25px] xl:left-[25px]"></div>

              <div className="w-full transition-all duration-700 md:group-hover:-translate-y-2 p-8 sm:p-12 md:p-12 max-w-xl sm:max-w-[650px] md:max-w-[650px]">
                <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-10 gap-4 sm:gap-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/45 text-indigo-600 flex items-center justify-center shadow-inner transition-colors group-hover:bg-indigo-700 group-hover:text-white">
                    <Rocket size={24} strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                    TECNOLOGIA
                  </span>
                </header>

                <h2 className="text-3xl md:text-4xl font-semibold text-slate-950 dark:text-white mb-6 tracking-tight leading-tight">
                  Soluções <br />
                  <span className="text-indigo-600 font-normal">
                    Escaláveis
                  </span>
                </h2>

                <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed tracking-tight mb-10 max-w-[480px]">
                  Nosso sistema acompanha o seu ritmo. Tecnologia de ponta que
                  garante performance constante para o seu crescimento.
                </p>

                <Link to="/sobre">
                  <button className="flex items-center gap-4 text-indigo-700 font-bold text-[10px] uppercase tracking-[0.2em] group/btn cursor-pointer">
                    Saber Mais
                    <div className="w-10 h-10 rounded-full border border-indigo-100 flex items-center justify-center group-hover/btn:bg-indigo-700 group-hover/btn:text-white transition-all shadow-sm">
                      <ArrowRight size={14} />
                    </div>
                  </button>
                </Link>
              </div>
            </section>

            <section className="h-32" />
          </div>
        </div>
      </HomeLayout>

      <HomeFinalShowCase />
    </>
  );
};

export default Home;
