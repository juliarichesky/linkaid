import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";

import robotLostDesktop from "../../assets/images/404/lost-robot.png";
import robotLostMobile from "../../assets/images/404/lost-robot.png";

const NotFound = () => {
  return (
    <section className="w-full pt-20 pb-20 lg:pt-32 lg:pb-32 relative overflow-hidden bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 max-w-[1200px] relative z-10 md:mt-15">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* left side- text */}
          <div className="flex flex-col text-center lg:text-left order-1">
            <h1 className="text-[12vw] sm:text-[9vw] md:text-[6vw] lg:text-[4.5vw] font-bold text-slate-950 dark:text-white tracking-tighter leading-[0.85] md:leading-[0.85] lg:leading-[0.8] mb-6">
              Uh-oh! <br />
              <span className="text-blue-600 font-light relative">
                Conexão
              </span>{" "}
              <br />
              perdida.
            </h1>

            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed tracking-tight max-w-[440px] mx-auto lg:mx-0 mb-10">
              A página que você procurava se desconectou do nosso link
              principal. Talvez o endereço tenha mudado ou o robô tenha se
              perdido no caminho.
            </p>

            {/* button */}
            <div className="flex justify-center lg:justify-start">
              <Link
                to="/"
                className="flex items-center gap-4 text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] group cursor-pointer"
              >
                Voltar para o Início
                <div className="w-12 h-12 rounded-full border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <MoveLeft size={16} />
                </div>
              </Link>
            </div>
          </div>

          {/* right side- robot */}
          <div className="relative w-full flex justify-center order-2 mt-40 lg:mt-0">
            {/* baloon */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[240px] lg:-top-20 lg:left-[40px] lg:translate-x-0 z-30 animate-bounce duration-[2000ms]">
              <div className="bg-white dark:bg-slate-950 border-[1.5px] border-slate-900/30 dark:border-slate-700 p-5 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.06)] relative text-center">
                <p className="font-mono text-[11px] font-medium text-slate-700 dark:text-slate-300 italic leading-tight">
                  Bip-bop! Minhas antenas estão confusas, não encontrei essa
                  coordenada!
                </p>
                <div className="absolute bg-white dark:bg-slate-950 w-3 h-3 border-slate-900/30 dark:border-slate-700 -bottom-1.5 left-1/2 -translate-x-1/2 rotate-45 border-r-[1.5px] border-b-[1.5px] lg:left-auto lg:right-10"></div>
              </div>
            </div>

            {/* bot */}
            <picture>
              <source media="(max-width: 768px)" srcSet={robotLostMobile} />
              <img
                src={robotLostDesktop}
                alt="Robô perdido"
                className="w-[180px] lg:w-[220px] pointer-events-none select-none z-20 transition-all duration-500 -mt-10"
              />
            </picture>

            {/* shadow */}
            <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900/5 blur-[8px] rounded-full z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
