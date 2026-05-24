import React from "react";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

interface HeroProps {
  titleBlack: string;
  titleBlue: string;
  description: string;
  scrollText: string;
  ScrollIcon: React.ElementType;
  highlightWord?: string;
  children?: React.ReactNode; // for FaqSearch
}

const HeroDefault = ({
  titleBlack,
  titleBlue,
  description,
  scrollText,
  ScrollIcon,
  highlightWord,
  children,
}: HeroProps) => {
  const renderDescription = () => {
    if (!highlightWord) return description;
    const parts = description.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="text-blue-600 font-medium">{highlightWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="relative w-full bg-white dark:bg-slate-950 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 pt-24 lg:pt-28 mb-16 md:mb-20 relative z-10 lg:pl-12 xl:pl-32">
        <Breadcrumb />

        <div className="flex flex-col lg:flex-row items-center lg:items-end lg:justify-start gap-8 lg:gap-16 text-center lg:text-left">
          <div className="w-full lg:w-fit shrink-0">
            <h1 className="font-bold text-slate-950 dark:text-white tracking-[-0.05em] leading-[0.85] text-[12vw] sm:text-[12vw] md:text-[10vw] lg:text-[7vw] xl:text-[6vw]">
              {titleBlack} <br />
              <span className="text-blue-600 font-light block">
                {titleBlue}
              </span>
            </h1>
          </div>

          <div className="max-w-[450px] lg:max-w-[380px] lg:ml-8 pb-4 shrink-0">
            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed tracking-tight">
              {renderDescription()}
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-2 mt-5 text-blue-600 animate-bounce">
              <ScrollIcon size={16} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                {scrollText}
              </span>
            </div>
          </div>
        </div>

        {children && <div className="w-full mt-12 lg:mt-16">{children}</div>}
      </div>
    </section>
  );
};

export default HeroDefault;
