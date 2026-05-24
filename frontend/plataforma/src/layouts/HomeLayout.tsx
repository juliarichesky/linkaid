import { useEffect, useState } from "react";
import HomeHero from "../components/HomeHero/HomeHero";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState("sec1");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -30% 0px",
        threshold: 0,
      },
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen w-full bg-white dark:bg-slate-950 items-start">
      {/* left side content (sticky hero) */}
      <div className="w-full md:w-[45%] relative md:sticky md:top-[100px] h-auto md:h-[calc(100vh-100px)] flex items-center justify-center md:justify-end px-6 md:pr-16 py-20 md:py-0 bg-white dark:bg-slate-950 z-20 overflow-hidden">
        <HomeHero activeSection={activeSection} />
      </div>

      {/* right side content (scrolls normally) */}
      <div className="w-full md:w-[55%] bg-slate-50 dark:bg-slate-900 border-none relative z-10 min-h-screen">
        <div className="flex flex-col">{children}</div>
      </div>
    </div>
  );
}
