import { useRef, type FC } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface HeroProps {
  activeSection: string;
}

const HomeHero: FC<HeroProps> = ({ activeSection }) => {
  const container = useRef<HTMLDivElement>(null);

  const content = {
    sec1: {
      title: "Otimizar conexões",
      highlight: "conexões",
      description:
        "Organize sua operação e acabe com a fragmentação de dados. Centralizamos tudo o que sua organização precisa em um conector inteligente.",
    },
    sec2: {
      title: "Gerar impacto",
      highlight: "impacto",
      description:
        "Meça e comprove os resultados do seu trabalho de forma transparente. Transformamos atividades em dados estratégicos para prestação de contas.",
    },
    sec3: {
      title: "Escalar soluções",
      highlight: "soluções",
      description:
        "Construa uma estrutura pronta para crescer de forma sustentável. Nossa tecnologia garante performance e eficiência para qualquer tamanho de operação.",
    },
  };

  const current =
    content[activeSection as keyof typeof content] || content.sec1;

  useGSAP(
    () => {
      if (!container.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".char-reveal",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, delay: 0.2 },
      )
        .fromTo(
          ".hero-line-animated",
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.5,
            ease: "expo.inOut",
            transformOrigin: "left center",
          },
          "-=0.8",
        )
        .fromTo(
          ".hero-description-reveal",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=1",
        );

      gsap.fromTo(
        ".hero-button-fixed",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 1, ease: "power3.out" },
      );
    },
    { scope: container, dependencies: [activeSection] },
  );

  const splitTitle = (text: string, highlight: string) => {
    return text.split(" ").map((word, index) => {
      const isHighlighted = word.toLowerCase() === highlight.toLowerCase();
      return (
        <span
          key={index}
          className="inline-block overflow-hidden pb-0 mr-[0.2em]"
        >
          <span
            className={`char-reveal inline-block ${
              isHighlighted
                ? "text-blue-600 font-bold"
                : "font-semibold text-slate-950 dark:text-white"
            }`}
          >
            {word}
          </span>
        </span>
      );
    });
  };

  return (
    <div
      ref={container}
      className="flex flex-col gap-6 md:gap-8 items-center lg:items-start text-center lg:text-left w-full md:w-[65%] max-w-[480px] sm:max-w-[550px] md:max-w-[750px] lg:max-w-[650px] px-6 sm:px-10 md:px-0 lg:px-0 pt-12 sm:pt-44 md:pt-0 lg:pt-0 md:ml-[15%] lg:ml-20 xl:ml-32"
    >
      {/* title */}
      <h1 className="text-[10vw] sm:text-[8vw] md:text-[5.5vw] lg:text-[4vw] xl:text-[3.8vw] tracking-[-0.05em] leading-[0.85] md:leading-[0.8] mb-4">
        <span className="inline-block mb-1">
          {splitTitle(current.title, current.highlight)}
        </span>
        <br />
        <span className="char-reveal inline-block font-light text-slate-400 dark:text-slate-500 tracking-[-0.02em]">
          é o nosso código.
        </span>
      </h1>

      {/* line */}
      <div className="hero-line-animated w-full max-w-[320px] sm:max-w-[450px] h-[6px] bg-gradient-to-r from-green-400 via-green-500 to-green-300 rounded-full shadow-[0_10px_30px_rgba(34,197,94,0.2)]"></div>

      {/* descricao */}
      <p className="hero-description-reveal text-base md:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed tracking-tight max-w-[520px]">
        {current.description}
      </p>

      {/* button */}
      <a
        href="https://link-aid-site.lovable.app"
        target="_blank"
        rel="noopener noreferrer"
        className="hero-button-fixed group relative inline-flex items-center justify-center gap-4 px-8 py-4 rounded-full bg-blue-600 text-white transition-all duration-500 shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-95 overflow-hidden"
      >
        <span className="relative z-10 font-bold uppercase text-[11px] tracking-[0.2em]">
          Acessar Solução
        </span>
        <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 dark:bg-slate-950/70 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 group-hover:bg-white/20">
          <ArrowUpRight size={18} strokeWidth={2.5} />
        </div>
      </a>
    </div>
  );
};

export default HomeHero;
