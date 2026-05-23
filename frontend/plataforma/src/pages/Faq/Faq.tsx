import { useState, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FaqSection from "../../components/FaqSection/FaqSection";
import HeroDefault from "../../Layout/HeroDefault";
import FaqSearch from "../../components/FaqSearch/FaqSearch";
import { HelpCircle } from "lucide-react";
import { faqData } from "../../data/faq";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
}

const Faq = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setActiveId(null);
    setTimeout(() => ScrollTrigger.refresh(), 50);
  };

  const scrollToFaq = (faqId: string) => {
    setActiveId(faqId);
    setSearchTerm("");

    setTimeout(() => {
      ScrollTrigger.refresh();
      const targetId = `faq-item-${faqId}`;
      const element = document.getElementById(targetId);

      if (element) {
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;

        gsap.to(window, {
          duration: 1.5,
          scrollTo: {
            y: elementPosition - 120,
            autoKill: false,
          },
          ease: "power4.inOut",
        });
      }
    }, 400);
  };

  const dynamicMargin = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (term.length < 2) return "mt-12 lg:mt-24";
    const hasResults = faqData.some((item) =>
      item.question.toLowerCase().includes(term),
    );
    return hasResults ? "mt-64 lg:mt-80" : "mt-12 lg:mt-24";
  }, [searchTerm]);

  return (
    <main className="w-full relative overflow-x-clip">
      <HeroDefault
        titleBlack="Esclareça as"
        titleBlue="suas dúvidas."
        description="Encontre respostas rápidas para as perguntas mais comuns sobre o LinkAid. Estamos aqui para ajudar você a navegar com clareza."
        scrollText="Central de ajuda"
        ScrollIcon={HelpCircle}
        highlightWord="clareza"
      />

      <div className="container mx-auto px-6 lg:pl-12 xl:pl-32 relative z-40 -mt-20 lg:-mt-28">
        <FaqSearch
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSuggestionClick={scrollToFaq}
        />
      </div>

      <div
        ref={sectionRef}
        className={`transition-all duration-500 ease-in-out relative z-10 pb-20 ${dynamicMargin}`}
      >
        <FaqSection searchTerm={searchTerm} activeId={activeId} />
      </div>
    </main>
  );
};

export default Faq;
