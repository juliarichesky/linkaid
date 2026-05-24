import { useRef, type FC } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import imgDesktop from "../../assets/images/painel/financeiro-desktop.png";
import imgMobile from "../../assets/images/painel/financeiro-mobile.png";
import { platformPath } from "@/routes/platform";

gsap.registerPlugin(ScrollTrigger);

const HomeFinalShowCase: FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".reveal-text", {
        y: 40,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.fromTo(
        imageRef.current,
        {
          y: 150,
          rotateX: 10,
          scale: 0.9,
          filter: "blur(20px)",
        },
        {
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 2.5,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
            end: "top 10%",
            scrub: 1.8,
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <>
      <section
        ref={container}
        className="relative w-full h-auto bg-white dark:bg-slate-950 flex flex-col items-center justify-center overflow-hidden pt-16 md:pt-32 pb-0"
      >
        <div className="container mx-auto px-6 z-20 text-center mb-16 md:mb-24 max-w-[90%] md:max-w-[800px] lg:max-w-[950px]">
          <h2 className="reveal-text text-[10vw] sm:text-[8vw] md:text-[5.5vw] lg:text-[4.5vw] font-semibold text-slate-950 dark:text-white tracking-[-0.05em] leading-[0.85] md:leading-[0.8] mb-8">
            Toda sua operação
            <br className="hidden sm:block" />
            <span className="text-blue-600 font-light block sm:inline">
              {" "}
              em um lugar.
            </span>
          </h2>

          <p className="reveal-text text-base md:text-lg lg:text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed tracking-tight max-w-[600px] mx-auto opacity-90">
            Dê uma olhada em como transformamos dados complexos em uma navegação
            simples. Abaixo, uma prévia de como sua organização será gerenciada.
          </p>
        </div>

        <div className="relative w-full max-w-[1450px] px-4 md:px-12 z-10 perspective-1000">
          <div
            ref={imageRef}
            className="relative w-full rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 opacity-100"
            style={{
              boxShadow:
                "0 -50px 70px -30px rgba(0, 0, 0, 0.05), 0 80px 120px -40px rgba(0, 0, 0, 0.12), 0 30px 60px -20px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div className="flex items-center gap-3 px-6 h-12 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/70 relative z-10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                linkaid.app / dashboard
              </p>
            </div>

            {/* interface desktop */}
            <img
              src={imgDesktop}
              alt="Interface Desktop Placeholder"
              className="hidden md:block w-full h-auto object-cover opacity-100 rounded-2xl"
            />

            {/* interface mobile */}
            <img
              src={imgMobile}
              alt="Interface Mobile Placeholder"
              className="block md:hidden w-full h-auto object-cover opacity-100 rounded-2xl"
            />
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-400/10 blur-[120px] -z-10 rounded-full" />
        </div>
      </section>

      <div className="w-full flex justify-center py-20">
        <Link
          to={platformPath("/")}
          className="reveal-text group relative inline-flex items-center justify-center gap-4 px-8 py-4 rounded-full bg-blue-600 text-white transition-all duration-500 shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-95 overflow-hidden -mt-0"
        >
          <span className="relative z-10 font-bold uppercase text-[11px] tracking-[0.2em]">
            Ver Painel Completo
          </span>
          <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 dark:bg-slate-950/70 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 group-hover:bg-white/20">
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </div>
        </Link>
      </div>
    </>
  );
};

export default HomeFinalShowCase;
