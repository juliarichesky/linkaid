import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactMap: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const infoSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mapContainerRef.current,
        { scale: 0.98, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );

      gsap.fromTo(
        infoSectionRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white dark:bg-slate-950 py-24 overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          {/* title + paragraph */}
          <div className="flex flex-col gap-4 items-center lg:items-start">
            <span className="font-mono text-blue-600 text-[11px] font-bold uppercase tracking-[0.3em]">
              Localização
            </span>
            <h2 className="text-[12vw] sm:text-[9vw] md:text-[6vw] lg:text-[4.5vw] font-bold text-slate-950 dark:text-white tracking-tighter leading-[0.85] text-center lg:text-left">
              Onde <br className="lg:hidden" />
              <span className="text-blue-600 font-light lg:ml-0">estamos.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed tracking-tight max-w-[440px] mt-2 text-center lg:text-left">
              Nosso QG fica no coração de São Paulo. Venha tomar um café com a
              nossa equipe e conhecer o futuro do LinkAid de perto.
            </p>
          </div>

          <div
            ref={infoSectionRef}
            className="flex flex-col gap-8 lg:gap-10 items-center lg:items-start lg:pl-20 lg:border-l lg:border-slate-100 dark:lg:border-slate-800"
          >
            <div className="flex flex-col gap-8 items-start w-full max-w-[280px] lg:max-w-none">
              {/* adress */}
              <div className="flex gap-5 group items-start text-left">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-blue-600 shrink-0 transition-all group-hover:bg-blue-50 dark:group-hover:bg-blue-950/60 group-hover:scale-110">
                  <MapPin size={22} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-mono text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
                    Endereço
                  </h4>
                  <p className="text-[14px] text-slate-700 dark:text-slate-300 font-medium leading-tight">
                    Av. Paulista, 1100 - Bela Vista
                    <br />
                    São Paulo - SP, 01310-100
                  </p>
                </div>
              </div>

              {/* atendimento */}
              <div className="flex gap-5 group items-start text-left">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-blue-600 shrink-0 transition-all group-hover:bg-slate-100 dark:group-hover:bg-slate-800 group-hover:scale-110">
                  <Clock size={22} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-mono text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
                    Atendimento
                  </h4>
                  <p className="text-[14px] text-slate-700 dark:text-slate-300 font-medium leading-tight">
                    Segunda a Sexta: 09h às 18h
                    <br />
                    Sábados: 09h às 13h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* map */}
        <div
          ref={mapContainerRef}
          className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl z-10"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.065830504153!2d-46.65298392375806!3d-23.56430936118671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-100!5e0!3m2!1spt-BR!2sbr!4v1710500000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{
              border: 0,
              filter:
                "grayscale(30%) brightness(1.05) contrast(0.9) opacity(0.9)",
            }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
export default ContactMap;
