import { Link2, HeartHandshake } from "lucide-react";
import LogoLinkAid from "../../assets/icons/logo.png";
import "../../index.css";

const AboutMeaning = () => {
  return (
    <section className="w-full pt-20 pb-12 md:pb-0 lg:pt-32 lg:pb-0 bg-white dark:bg-slate-950 overflow-hidden relative -mt-10 md:-mt-20 lg:-mt-24">
      <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* left side */}
          <div className="flex flex-col text-left lg:text-left order-1">
            {/* title */}
            <div className="flex flex-col gap-4 mb-10 items-center lg:items-start">
              <h2 className="text-[12vw] sm:text-[9vw] md:text-[6vw] lg:text-[4.5vw] font-bold text-slate-950 dark:text-white tracking-tighter leading-[0.85] md:leading-[0.85] lg:leading-[0.8] text-center lg:text-left">
                O significado <br className="lg:hidden" /> do
                <span className="text-blue-600 font-light ml-2 lg:ml-4">
                  nome.
                </span>
              </h2>

              {/* paragrafo */}
              <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed tracking-tight max-w-[480px] mx-auto lg:mx-0 text-center lg:text-left mt-4">
                Nosso nome é a fusão de duas palavras que definem nossa missão
                no mundo.
              </p>
            </div>

            {/* meanings */}
            <div className="flex flex-col gap-8 w-full max-w-[480px] lg:max-w-none mx-auto lg:mx-0">
              {/* cards */}
              <div className="flex flex-row items-start gap-5 group">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-blue-600 shadow-sm transition-all duration-500 group-hover:border-blue-200 group-hover:shadow-md group-hover:scale-105">
                  <Link2 size={26} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-blue-600 tracking-tight">
                    Link{" "}
                    <span className="text-slate-400 dark:text-slate-500 font-medium text-xs ml-1">
                      (Conectar)
                    </span>
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed tracking-tight">
                    Centralização de canais e a conexão direta entre quem
                    precisa e quem pode ajudar.
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-start gap-5 group">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-green-600 shadow-sm transition-all duration-500 group-hover:border-green-200 group-hover:shadow-md group-hover:scale-105">
                  <HeartHandshake size={26} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-green-600 tracking-tight">
                    Aid{" "}
                    <span className="text-slate-400 dark:text-slate-500 font-medium text-xs ml-1">
                      (Ajuda)
                    </span>
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed tracking-tight">
                    Assistência rápida, eficiente e humana para o terceiro
                    setor.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* right side - logo */}
          <div className="hidden lg:flex items-center justify-center lg:justify-end relative lg:h-[650px] order-2">
            <div className="relative flex items-center justify-center scale-90 lg:scale-100">
              <div className="relative w-[480px] h-[480px] flex items-center justify-center">
                <div className="animate-float relative z-10 w-full h-full flex items-center justify-center">
                  <img
                    src={LogoLinkAid}
                    alt="Logo LinkAid"
                    className="w-[85%] h-[85%] object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.08)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutMeaning;
