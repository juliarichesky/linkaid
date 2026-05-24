import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { platformPath } from "@/routes/platform";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const lightBackgroundImage =
  "https://images.unsplash.com/photo-1619252584172-a83a949b6efd?q=80&w=1974&auto=format&fit=crop";
const darkBackgroundImage =
  "https://images.unsplash.com/photo-1651746605872-66fec1defdb5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const AboutClosing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /* background image fade and scale on scroll */
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.1 },
        {
          opacity: 0.8,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 md:py-32 flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-slate-950"
    >
      {/* background image with double gradient mask */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
      >
        <img
          src={lightBackgroundImage}
          alt="background connection"
          className="h-full w-full object-cover dark:hidden"
        />
        <img
          src={darkBackgroundImage}
          alt="background connection"
          className="hidden h-full w-full object-cover dark:block"
        />

        {/* double gradient mask for seamless blending */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white dark:from-slate-950 via-white/40 dark:via-slate-950/40 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white dark:from-slate-950 via-white/40 dark:via-slate-950/40 to-transparent z-10" />
      </div>

      <div className="container mx-auto px-10 max-w-[1200px] flex flex-col items-center text-center relative z-20">
        {/* heading: matching hero typography standards */}
        <div className="mb-10 lg:mb-16">
          <h2
            className="font-bold text-slate-950 dark:text-white tracking-[-0.05em] leading-[0.85]
                         text-[14vw] sm:text-[12vw] md:text-[10vw] 
                         lg:text-[7vw] xl:text-[6vw]"
          >
            Fácil assim, <br />
            <span className="text-blue-600 font-light block whitespace-nowrap">
              como deve ser.
            </span>
          </h2>
        </div>

        {/* paragraph: box width increased for desktop as requested */}
        <div className="max-w-[450px] lg:max-w-[650px] mb-12 lg:mb-16">
          <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg lg:text-xl font-light leading-relaxed tracking-tight">
            Sem complicações. Um jeito novo de organizar seu dia a dia com
            leveza e inteligência.
          </p>
        </div>

        <button>
          {/* button */}
          <Link
            to={platformPath("/")}
            className="reveal-text group relative inline-flex items-center justify-center gap-4 px-8 py-4 rounded-full bg-blue-600 text-white transition-all duration-500 shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 font-bold uppercase text-[11px] tracking-[0.2em]">
              Ver Painel Completo
            </span>
            <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 dark:bg-slate-950/70 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 group-hover:bg-white/20">
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </div>
          </Link>
        </button>
      </div>
    </section>
  );
};

export default AboutClosing;
