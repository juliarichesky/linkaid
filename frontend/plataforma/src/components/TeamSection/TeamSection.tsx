import { useRef } from "react";
import { Link } from "react-router-dom";
import developers from "../../data/developers.json";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import juliaGuimaraesImage from "../../assets/images/team/julia-guimaraes.png";
import juliaSpanopoulosImage from "../../assets/images/team/julia-spanopoulos.png";

const developerImages: Record<string, string> = {
  "julia-guimaraes.png": juliaGuimaraesImage,
  "julia-spanopoulos.png": juliaSpanopoulosImage,
};

const TeamSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getImageUrl = (name: string) => {
    return developerImages[name];
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const items = containerRef.current.querySelectorAll(".team-item");

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.2, // atraso entre a entrada de cada foto
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="py-24 -mt-51 -mb-5 lg:-mt-45 lg:-mb-12 bg-white dark:bg-slate-950"
    >
      <div className="container mx-auto px-6 max-w-[1400px]">
        {/* container */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-16">
          {developers.map((dev) => (
            <Link
              to={`/equipe/${dev.id}`}
              key={dev.id}
              className="team-item group flex flex-col items-center text-center w-full sm:w-[calc(45%-1.5rem)] lg:w-[calc(33.333%-3rem)] max-w-[450px]"
            >
              {/* cards */}
              <div
                className="relative w-full aspect-square overflow-hidden rounded-[3.5rem] 
                shadow-[0_15px_60px_-15px_rgba(0,0,0,0.1)] 
                transition-all duration-500 
                group-hover:scale-[1.03] 
                group-hover:shadow-[0_35px_100px_-20px_rgba(37,99,235,0.25)] 
                border border-slate-100/50 dark:border-slate-800/80"
              >
                {/* images */}
                <img
                  src={getImageUrl(dev.image)}
                  alt={dev.name}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-3">
                  {/* icon */}
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-[0_10px_25px_rgba(37,99,235,0.4)] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    <ArrowRight size={32} strokeWidth={2.5} />
                  </div>

                  {/* text */}
                  <span className="text-blue-600 font-bold uppercase text-[10px] tracking-[0.3em] bg-white dark:bg-slate-950 px-5 py-2 rounded-full shadow-lg transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                    Ver Perfil
                  </span>
                </div>
              </div>

              {/* texts */}
              <div className="mt-8 flex flex-col items-center">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-950 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                  {dev.name}
                </h3>
                <p className="text-blue-600 text-base md:text-lg font-medium mt-2 uppercase tracking-[0.2em]">
                  {dev.role}
                </p>
                {/* barrinha azul */}
                <div className="h-[2px] w-0 bg-blue-600 mt-3 group-hover:w-full transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
