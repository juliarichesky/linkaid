import { useState } from "react";
import * as Icons from "lucide-react";
import { X, Zap } from "lucide-react";
import featuresData from "../../data/features.json";

interface Feature {
  id: string;
  name: string;
  desc: string;
  tech: string;
  icon: string;
  color: string;
}

const AboutFeaturesOrbit = () => {
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleFeatureClick = (feature: Feature) => {
    setActiveFeature(feature);
    setIsPaused(true);
  };

  const closeCard = () => {
    setActiveFeature(null);
    setIsPaused(false);
  };

  return (
    <section className="w-full pt-25 pb-24 lg:pt-56 lg:pb-32 bg-white dark:bg-slate-950 relative">
      <div className="container mx-auto px-6 max-w-[1200px] relative z-10 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-start overflow-visible">
          {/* left side - orbit */}
          <div className="flex items-center justify-center lg:justify-start relative mt-16 lg:-mt-16 lg:h-[550px] order-2 lg:order-1">
            <div className="relative flex items-center justify-center scale-110 sm:scale-100 lg:scale-110">
              <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px] flex items-center justify-center">
                {/* central icon */}
                <div className="relative z-10 w-16 h-16 md:w-24 md:h-24 bg-white dark:bg-slate-950 rounded-full flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                  <Zap size={32} className="text-blue-600 fill-blue-600" />
                  <div className="absolute inset-0 bg-blue-100 dark:bg-blue-950/60 rounded-full animate-ping opacity-20" />
                </div>

                {/* orbit line */}
                <div className="absolute inset-0 border border-slate-100 dark:border-slate-800 rounded-full pointer-events-none" />

                {/* itens */}
                <div
                  className={`absolute inset-0 animate-orbit-spin ${isPaused ? "pause-animation" : ""}`}
                >
                  {featuresData.map((feature: Feature, index) => {
                    const angle = (index * 360) / featuresData.length;
                    const isActive = activeFeature?.id === feature.id;

                    const IconComponent = Icons[
                      feature.icon as keyof typeof Icons
                    ] as React.ElementType;

                    return (
                      <div
                        key={feature.id}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer orbit-item"
                        style={{
                          transform: `rotate(${angle}deg) translate(var(--orbit-radius)) rotate(-${angle}deg)`,
                        }}
                      >
                        <div
                          onClick={() => handleFeatureClick(feature)}
                          className={`animate-orbit-spin-reverse ${isPaused ? "pause-animation" : ""}`}
                        >
                          <div
                            className={`w-10 h-10 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 animate-soft-pulse border
                            ${isActive ? "scale-125 shadow-lg" : "bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 hover:scale-110"}`}
                            style={{
                              backgroundColor: isActive
                                ? feature.color
                                : undefined,
                              color: isActive ? "white" : feature.color,
                              borderColor: isActive ? feature.color : undefined,
                              boxShadow: isActive
                                ? `0 15px 35px ${feature.color}66`
                                : "",
                            }}
                          >
                            {IconComponent && <IconComponent size={24} />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* right side */}
          <div className="flex flex-col text-center lg:text-right items-center lg:items-end order-1 lg:order-2 lg:pt-10 overflow-visible">
            <div className="flex flex-col gap-4 mb-6 lg:mb-8">
              <h2 className="text-[12vw] sm:text-[9vw] md:text-[6vw] lg:text-[4.5vw] font-bold text-slate-950 dark:text-white tracking-tighter leading-[0.85] md:leading-[0.85] lg:leading-[0.8]">
                O resultado é <br className="lg:hidden" />
                <span className="text-blue-600 font-light mr-2 lg:mr-4 ">
                  dinâmico.
                </span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed tracking-tight max-w-[480px] mx-auto lg:mr-0 mt-2">
                Interaja com os módulos para entender como nossa tecnologia
                impulsiona sua comunicação.
              </p>
            </div>

            <div className="flex flex-col w-full max-w-[480px] lg:max-w-none min-h-fit mb-6 lg:mb-0 overflow-visible">
              {activeFeature ? (
                <div className="w-full animate-in fade-in slide-in-from-right-6 duration-500 overflow-visible">
                  <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 dark:border-slate-800 shadow-[0_40px_80px_rgba(0,0,0,0.12)] relative overflow-hidden group text-left">
                    {/* closed button */}
                    <button
                      onClick={closeCard}
                      className="absolute top-6 right-6 text-slate-300 dark:text-slate-600 hover:text-slate-900 transition-colors focus:outline-none"
                    >
                      <X size={20} className="cursor-pointer" />
                    </button>

                    <div className="flex items-center gap-5 mb-6">
                      {/* icon card -json */}
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center border shrink-0"
                        style={{
                          backgroundColor: `${activeFeature.color}1a`, // 10% opacity
                          color: activeFeature.color,
                          borderColor: `${activeFeature.color}33`, // 20% opacity
                        }}
                      >
                        {(() => {
                          const CardIcon = Icons[
                            activeFeature.icon as keyof typeof Icons
                          ] as React.ElementType;
                          return CardIcon ? <CardIcon size={24} /> : null;
                        })()}
                      </div>

                      <div className="flex flex-col">
                        <h3 className="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight leading-none">
                          {activeFeature.name}
                        </h3>
                        <span
                          className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2"
                          style={{ color: activeFeature.color }}
                        >
                          {activeFeature.tech}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed tracking-tight">
                      {activeFeature.desc}
                    </p>
                  </div>
                </div>
              ) : (
                /* void */
                <div className="flex flex-col items-center lg:items-end gap-4 py-4 opacity-40">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-[0.4em] font-bold">
                      Aguardando seleção
                    </span>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFeaturesOrbit;
