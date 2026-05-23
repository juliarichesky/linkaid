import { useRef } from "react";
import { Heart, Link, Clock } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutPerformance = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());

      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        },
      );

      const counters = gsap.utils.toArray(".stat-number");
      counters.forEach((counter) => {
        const el = counter as HTMLElement;
        const target = parseFloat(el.getAttribute("data-target") || "0");

        gsap.to(el, {
          innerText: target,
          duration: 1.2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        });
      });

      ScrollTrigger.refresh();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="w-full pt-10 pb-24 md:pt-25 md:pb-32 bg-white dark:bg-slate-950 relative"
    >
      <div className="container mx-auto px-6 max-w-[1300px]">
        <div className="flex flex-wrap justify-center items-stretch gap-y-10 md:gap-x-10 lg:gap-x-12">
          {/* communication card */}
          <div className="stat-card opacity-0 flex flex-col items-center text-center gap-6 flex-1 min-w-[300px] max-w-[380px] p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-500 hover:bg-white dark:hover:bg-slate-900 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/40 hover:-translate-y-2">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-950 shadow-sm flex items-center justify-center text-blue-600 border border-slate-100 dark:border-slate-800">
              <Link size={24} strokeWidth={2} />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                Central de Comunicação
              </span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-2xl font-bold text-blue-600">+</span>
                <span
                  className="stat-number text-6xl md:text-7xl font-bold text-slate-950 dark:text-white tracking-tighter"
                  data-target="15"
                >
                  0
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
              Todas suas redes sociais unificadas em uma única interface
              inteligente.
            </p>
          </div>

          {/* response time card */}
          <div className="stat-card opacity-0 flex flex-col items-center text-center gap-6 flex-1 min-w-[300px] max-w-[380px] p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-500 hover:bg-white dark:hover:bg-slate-900 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/40 hover:-translate-y-2">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-950 shadow-sm flex items-center justify-center text-blue-600 border border-slate-100 dark:border-slate-800">
              <Clock size={24} strokeWidth={2} />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                Tempo de Resposta
              </span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-2xl font-bold text-blue-600">-</span>
                <span
                  className="stat-number text-6xl md:text-7xl font-bold text-slate-950 dark:text-white tracking-tighter"
                  data-target="60"
                >
                  0
                </span>
                <span className="text-2xl font-bold text-blue-600">%</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
              Redução no tempo de resposta e triagem inteligente de pedidos.
            </p>
          </div>

          {/* effectiveness card */}
          <div className="stat-card opacity-0 flex flex-col items-center text-center gap-6 flex-1 min-w-[300px] max-w-[380px] p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-500 hover:bg-white dark:hover:bg-slate-900 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/40 hover:-translate-y-2">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-950 shadow-sm flex items-center justify-center text-blue-600 border border-slate-100 dark:border-slate-800">
              <Heart size={24} strokeWidth={2} />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                Triagem Efetiva
              </span>
              <div className="flex items-baseline justify-center gap-1">
                <span
                  className="stat-number text-6xl md:text-7xl font-bold text-slate-950 dark:text-white tracking-tighter"
                  data-target="95"
                >
                  0
                </span>
                <span className="text-2xl font-bold text-blue-600">%</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
              Inteligência que entende e direciona com precisão os pedidos de
              ajuda.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPerformance;