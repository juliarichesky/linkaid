import { useParams, Link } from "react-router-dom";
import { useRef } from "react";
import developers from "../../data/developers.json";
import { ArrowLeft, Code, Link2, User, ChevronsUpDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NotFound from "../../pages/NotFound/NotFound";

const TeamDetails = () => {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const dev = developers.find((d) => d.id === Number(id));

  const getImageUrl = (name: string) => {
    return new URL(`../../assets/images/team/${name}`, import.meta.url).href;
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: -60, scale: 0.9, filter: "blur(10px)" },
        { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", duration: 1.5 },
      );

      tl.fromTo(
        contentRef.current,
        { opacity: 0, x: 60, filter: "blur(15px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.2 },
        "-=1",
      );
    },
    { scope: containerRef },
  );

  if (!dev) return <NotFound />;

  return (
    <main
      ref={containerRef}
      className="pt-30 pb-24 bg-white dark:bg-slate-950 min-h-screen overflow-hidden relative"
    >
      <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
        {/* breadcrumb */}
        <div className="flex justify-center md:justify-start">
          {" "}
          {/* Container para controlar o alinhamento */}
          <Link
            to="/equipe"
            className="group flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-12 w-fit transition-all"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-2"
            />
            Voltar para a Galeria
          </Link>
        </div>

        {/* grid ajustado para md (tablet) para manter lado a lado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* images */}
          <div
            ref={imageRef}
            className="relative aspect-square overflow-hidden rounded-[3rem] shadow-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 w-full max-w-[500px] mx-auto md:mx-0"
          >
            <img
              src={getImageUrl(dev.image)}
              alt={dev.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* content */}
          <div
            ref={contentRef}
            className="space-y-8 flex flex-col items-center md:items-start text-center md:text-left"
          >
            {/* labels */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm">
                <ChevronsUpDown size={12} className="text-blue-600" />
                <span className="text-slate-900 dark:text-slate-100 text-[10px] font-bold uppercase tracking-widest">
                  {dev.class}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm">
                <User size={12} className="text-blue-600" />
                <span className="text-slate-900 dark:text-slate-100 text-[10px] font-bold uppercase tracking-widest">
                  {dev.rm}
                </span>
              </div>
            </div>

            {/* name and role */}
            <div className="space-y-2">
              <h1 className="text-[10vw] sm:text-[6vw] md:text-[4vw] font-bold text-slate-950 dark:text-white tracking-[-0.05em] leading-[0.85]">
                {dev.name}
              </h1>
              <p className="text-xl md:text-2xl text-blue-600 font-light tracking-tight">
                {dev.role}
              </p>
            </div>

            <div className="h-[1px] w-20 bg-blue-600/30" />

            {/* description */}
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-[500px] tracking-tight">
              {dev.description}
            </p>

            {/* buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
              <a
                href={dev.code}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-green-600 text-white transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)] hover:-translate-y-1"
              >
                <Code
                  size={18}
                  className="transition-transform group-hover:scale-110"
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  github
                </span>
              </a>

              <a
                href={dev.link}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-[0_8px_25px_rgba(37,99,235,0.3)] hover:-translate-y-1"
              >
                <Link2
                  size={18}
                  className="transition-transform group-hover:scale-110"
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  linkedin
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TeamDetails;
