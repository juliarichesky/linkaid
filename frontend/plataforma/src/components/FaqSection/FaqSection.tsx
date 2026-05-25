import { useRef, useState, useMemo } from "react";
import { ChevronDown, Search, HelpCircle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faqData } from "../../data/faq";

interface FaqSectionProps {
  searchTerm: string;
  activeId?: string | null;
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FaqSection = ({ searchTerm, activeId }: FaqSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const [prevActiveId, setPrevActiveId] = useState(activeId);
  const [prevSearchTerm, setPrevSearchTerm] = useState(searchTerm);

  const filteredFaqs = useMemo(() => {
    const term = (searchTerm || "").trim().toLowerCase();
    if (term.length < 2) return faqData;
    return faqData.filter(
      (item) =>
        item.question.toLowerCase().includes(term) ||
        item.answer.toLowerCase().includes(term),
    );
  }, [searchTerm]);

  const isNotFound = useMemo(() => {
    const term = (searchTerm || "").trim().toLowerCase();
    return term.length >= 2 && filteredFaqs.length === 0;
  }, [searchTerm, filteredFaqs]);

  if (activeId !== prevActiveId) {
    setPrevActiveId(activeId);
    const index = filteredFaqs.findIndex((item) => item.id === activeId);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  }

  if (searchTerm !== prevSearchTerm) {
    setPrevSearchTerm(searchTerm);
    if (!activeId && searchTerm.length >= 2) {
      setSelectedIndex(0);
    }
  }

  useGSAP(
    () => {
      if (!isNotFound && filteredFaqs.length > 0) {
        gsap.fromTo(
          ".faq-item",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
          },
        );
      }
    },
    { scope: containerRef, dependencies: [isNotFound, filteredFaqs.length] },
  );

  const toggleAccordion = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <section
      ref={containerRef}
      className="w-full mt-16 -mb-10 md:mt-24 lg:mt-32 lg:-mb-10 pb-0 -md:pb-50 bg-white dark:bg-slate-950 relative z-20"
    >
      <div className="container mx-auto max-w-[900px] px-6">
        {isNotFound ? (
          <div className="pt-2 pb-6 lg:pb-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/70 p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 w-full">
              <div className="flex items-center gap-5 w-full sm:w-auto">
                <div className="w-12 h-12 bg-white dark:bg-slate-950 shadow-sm rounded-full flex items-center justify-center shrink-0">
                  <Search size={20} className="text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 tracking-tight leading-tight">
                    Nenhum resultado para{" "}
                    <span className="text-blue-600">"{searchTerm}"</span>
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-light mt-1">
                    Tente outras palavras ou limpe a busca.
                  </p>
                </div>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-slate-800 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-blue-600 transition-all cursor-pointer active:scale-95"
              >
                Limpar Busca
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            {filteredFaqs.map((item, index) => {
              const isActive = selectedIndex === index;

              return (
                <div
                  key={item.id}
                  id={`faq-item-${item.id}`}
                  className={`faq-item group relative transition-all duration-500 border-b dark:border-slate-800 overflow-hidden ${isActive ? "pb-4" : ""}`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between py-8 lg:py-10 px-2 text-left cursor-pointer bg-transparent z-10"
                  >
                    <div className="flex items-center gap-4 lg:gap-6 pr-4">
                      {/* icon */}
                      <div
                        className={`shrink-0 w-9 h-9 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? "bg-blue-100 dark:bg-blue-950/60 text-blue-600 shadow-inner" : "bg-slate-50 dark:bg-slate-900 text-blue-500 border border-slate-100 dark:border-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/60 group-hover:text-blue-500"}`}
                      >
                        <HelpCircle size={18} className="lg:w-5 lg:h-5" />
                      </div>

                      {/* id style */}
                      <span
                        className={`font-mono text-[10px] lg:text-xs font-bold transition-colors duration-300 tracking-[0.3em] ${isActive ? "text-blue-600" : "text-slate-400 dark:text-slate-500"}`}
                      >
                        {item.id.toString().padStart(2, "0")}
                      </span>

                      {/* question */}
                      <h3
                        className={`text-lg lg:text-2xl font-semibold tracking-[-0.04em] leading-[1.1] transition-colors duration-300 ${isActive ? "text-blue-600" : "text-slate-600 dark:text-slate-300 group-hover:text-blue-600"}`}
                      >
                        {item.question}
                      </h3>
                    </div>

                    {/* seta */}
                    <div
                      className={`shrink-0 flex items-center justify-center transition-all duration-500 ${isActive ? "rotate-180 text-blue-600" : "text-slate-300 dark:text-slate-600 group-hover:text-blue-600"}`}
                    >
                      <ChevronDown
                        size={24}
                        strokeWidth={2.5}
                        className="lg:w-7 lg:h-7"
                      />
                    </div>
                  </button>

                  {/* resposta */}
                  <div
                    className={`transition-all duration-700 ease-in-out ${isActive ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="pb-10 lg:pb-12 pl-[6rem] lg:pl-[8.5rem] pr-6 lg:pr-24">
                      <p className="text-slate-500 dark:text-slate-400 text-base lg:text-xl font-light leading-relaxed tracking-tight">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FaqSection;
