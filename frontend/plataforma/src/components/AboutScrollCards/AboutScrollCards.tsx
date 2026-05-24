import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  MousePointer2,
  Zap,
  Users,
  BarChart3,
  Heart,
} from "lucide-react";
import HeroDefault from "../../layouts/HeroDefault";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutScrollCards = () => {
  const container = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slideTrack = sliderRef.current;
      const mainSection = container.current;

      if (!slideTrack || !mainSection) return;

      const getScrollAmount = () =>
        -(slideTrack.scrollWidth - window.innerWidth);

      gsap.to(slideTrack, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: mainSection,
          pin: true,
          start: "top top",
          end: () => `+=${slideTrack.scrollWidth}`,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative w-full bg-white dark:bg-slate-950 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-blue-50/40 dark:bg-blue-950/30 blur-[100px] rounded-full -z-10" />

      <HeroDefault
        titleBlack="Comunicação"
        titleBlue="sem esforço."
        description="Criamos o LinkAid para facilitar seu dia a dia. Organizamos suas conexões para você ganhar tempo."
        scrollText="Explore o projeto"
        ScrollIcon={MousePointer2}
        highlightWord="facilitar"
      />
      <div className="relative flex items-center z-20 -mt-30 md:-mt-30 lg:-mt-25 py-4">
        <div
          ref={sliderRef}
          className="flex gap-4 md:gap-8 px-6 md:px-20 lg:px-32 flex-nowrap w-max will-change-transform items-center"
        >
          {/* card 1 */}
          <div className="w-[85vw] sm:w-[60vw] md:w-[450px] lg:w-[550px] h-[320px] md:h-[450px] lg:h-[500px] rounded-[2rem] md:rounded-[3.5rem] bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent z-10" />
            <h3 className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20 text-slate-600 dark:text-slate-300 text-xl md:text-4xl font-bold leading-tight">
              Nunca mais <br /> perder clientes.
            </h3>
            <img
              src="https://plus.unsplash.com/premium_photo-1674728198545-8fa4796b9297?q=80&w=1936&auto=format&fit=crop"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt=""
            />
          </div>

          {/* card 2 */}
          <div className="w-[80vw] sm:w-[55vw] md:w-[350px] lg:w-[420px] h-[320px] md:h-[450px] lg:h-[500px] rounded-[2rem] md:rounded-[3.5rem] bg-slate-900 p-8 md:p-12 flex flex-col justify-between text-white shrink-0 group">
            <Zap size={24} className="text-blue-400 fill-blue-400" />
            <h3 className="text-xl md:text-3xl font-bold leading-tight uppercase">
              Ticketing <br /> Sem Perdas
            </h3>
            <p className="text-white/70 text-xs md:text-base font-light">
              Centralizamos e priorizamos cada pedido.
            </p>
            <ArrowRight
              size={24}
              className="group-hover:translate-x-2 transition-transform text-blue-400"
            />
          </div>

          {/* card 3 */}
          <div className="w-[85vw] sm:w-[60vw] md:w-[450px] lg:w-[550px] h-[320px] md:h-[450px] lg:h-[500px] rounded-[2rem] md:rounded-[3.5rem] bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 relative group">
            <img
              src="https://images.unsplash.com/photo-1567201864585-6baec9110dac?q=80&w=1974&auto=format&fit=crop"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt=""
            />
            <div className="absolute inset-0 bg-white/20 dark:bg-slate-900/40 z-10" />
            <div className="absolute top-6 right-6 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-white text-[10px] uppercase tracking-widest font-bold">
              AI Hub
            </div>
          </div>

          {/* card 4 */}
          <div className="w-[80vw] sm:w-[55vw] md:w-[350px] lg:w-[420px] h-[320px] md:h-[450px] lg:h-[500px] rounded-[2rem] md:rounded-[3.5rem] bg-slate-800 p-8 md:p-12 flex flex-col justify-between text-white shrink-0 group">
            <Users size={24} className="text-blue-300" />
            <h3 className="text-xl md:text-3xl font-bold leading-tight uppercase">
              Pessoas <br /> para Pessoas.
            </h3>
            <p className="text-white/70 text-xs md:text-base font-light">
              Automatizamos o repetitivo para você focar no acolhimento.
            </p>
            <Heart
              size={24}
              className="group-hover:scale-110 transition-transform text-blue-300"
            />
          </div>

          {/* card 5 */}
          <div className="w-[80vw] sm:w-[55vw] md:w-[350px] lg:w-[420px] h-[320px] md:h-[450px] lg:h-[500px] rounded-[2rem] md:rounded-[3.5rem] bg-slate-950 p-8 md:p-12 flex flex-col justify-between text-white shrink-0 group">
            <BarChart3 size={24} className="text-blue-500" />
            <h3 className="text-xl md:text-3xl font-bold leading-tight uppercase">
              Dados em <br /> Tempo Real
            </h3>
            <p className="text-white/70 text-xs md:text-base font-light">
              Impacto social com dashboards inteligentes.
            </p>
            <ArrowRight
              size={24}
              className="group-hover:translate-x-2 transition-transform text-blue-500"
            />
          </div>

          {/* card final */}
          <div className="w-[90vw] md:w-[500px] lg:w-[800px] h-[320px] md:h-[450px] lg:h-[500px] rounded-[2rem] md:rounded-[3.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 overflow-hidden shrink-0 relative group flex flex-col justify-end p-10 md:p-16">
            <div className="relative z-20">
              <h3 className="text-slate-900 dark:text-slate-100 text-3xl md:text-6xl font-black italic leading-none tracking-tighter">
                Let's LinkAid.
              </h3>
              <p className="text-slate-400 dark:text-slate-500 text-[10px] md:text-sm font-mono mt-4 uppercase tracking-[0.4em]">
                O futuro da comunicação
              </p>
            </div>
          </div>

          {/* final space */}
          <div className="w-[10vw] shrink-0" />
        </div>
      </div>

      <div className="h-10 md:h-20" />
    </section>
  );
};
export default AboutScrollCards;
