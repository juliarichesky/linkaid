import { useState, useRef } from "react";
import {
  Files,
  Search,
  GitBranch,
  Play,
  Settings,
  UserCircle,
  ChevronDown,
  FileCode,
  X,
  Zap,
  Folder,
  Terminal,
} from "lucide-react";
import { technologiesData } from "../../data/tecnologies";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const AboutTech = () => {
  const [selectedId, setSelectedId] = useState(technologiesData[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const activeTech =
    technologiesData.find((t) => t.id === selectedId) || technologiesData[0];

  useGSAP(() => {
    gsap.fromTo(
      editorRef.current,
      { opacity: 0, x: 5 },
      { opacity: 1, x: 0, duration: 0.2, ease: "power1.out" },
    );
  }, [selectedId]);

  const handleSelectTech = (id: string) => {
    setSelectedId(id);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-white dark:bg-slate-950 overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="relative pt-8 lg:pt-14">
          {/* tag title */}
          <div className="absolute top-0 right-4 lg:right-12 z-[60] flex items-end">
            <div className="bg-[#F3F3F3] dark:bg-slate-900 border-t border-x border-slate-200 dark:border-slate-700 px-4 py-2 lg:px-8 lg:py-4 rounded-t-2xl lg:rounded-t-[2rem] shadow-[-5px_-5px_20px_rgba(0,0,0,0.02)] flex items-center gap-2 lg:gap-3">
              <Terminal size={14} className="text-blue-600 lg:w-[18px]" />
              <h2 className="text-xs lg:text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-[0.2em]">
                Tecnologias
              </h2>
            </div>
            <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-white dark:bg-slate-950 z-[61]" />
          </div>

          {/* editor */}
          <div className="w-full h-[500px] lg:h-[650px] rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xl bg-white dark:bg-slate-950 flex overflow-hidden relative z-10">
            {/* activity bar */}
            <div className="w-10 lg:w-16 bg-[#F3F3F3] dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex flex-col items-center py-4 justify-between shrink-0 z-[50]">
              <div className="flex flex-col gap-6 items-center w-full ">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className={`transition-all duration-300 ${isSidebarOpen || window.innerWidth >= 1024 ? "text-blue-600 border-l-2 border-blue-600 pl-1" : "text-slate-400 dark:text-slate-500 "}`}
                >
                  <Files size={20} className="cursor-pointer lg:w-[24px]" />
                </button>
                <Search
                  size={20}
                  className="text-slate-300 dark:text-slate-600 opacity-40 cursor-not-allowed lg:w-[24px]"
                />
                <GitBranch
                  size={20}
                  className="text-slate-300 dark:text-slate-600 opacity-40 cursor-not-allowed lg:w-[24px]"
                />
                <Play
                  size={20}
                  className="text-slate-300 dark:text-slate-600 opacity-40 cursor-not-allowed lg:w-[24px]"
                />
              </div>
              <div className="flex flex-col gap-4 items-center">
                <UserCircle
                  size={20}
                  className="text-slate-400 dark:text-slate-500 lg:w-[24px]"
                />
                <Settings
                  size={20}
                  className="text-slate-400 dark:text-slate-500 lg:w-[24px]"
                />
              </div>
            </div>

            {/* sidebar */}
            <div
              className={`
              absolute lg:relative left-10 lg:left-0 top-0 h-full w-52 lg:w-64 bg-[#F8F8F8] dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 
              transition-transform duration-300 z-[40]
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
            >
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                  Explorer
                </span>
                <X
                  size={14}
                  className="lg:hidden cursor-pointer text-slate-400 dark:text-slate-500"
                  onClick={() => setIsSidebarOpen(false)}
                />
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-slate-200/50">
                <ChevronDown
                  size={14}
                  className="text-slate-600 dark:text-slate-300"
                />
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase">
                  Link-Aid
                </span>
              </div>
              <div className="flex flex-col mt-1">
                <div className="flex items-center gap-1 px-4 py-1">
                  <Folder
                    size={14}
                    className="text-blue-400 fill-blue-400/20"
                  />
                  <span className="text-[12px] text-slate-600 dark:text-slate-300 font-medium">
                    technologies
                  </span>
                </div>
                <div className="flex flex-col">
                  {technologiesData.map((tech) => (
                    <button
                      key={tech.id}
                      onClick={() => handleSelectTech(tech.id)}
                      className={`flex items-center gap-2 pl-10 pr-4 py-1.5 transition-colors text-left ${
                        selectedId === tech.id
                          ? "bg-blue-100/50 text-blue-600"
                          : "text-slate-500 dark:text-slate-400 hover:bg-slate-200/30 cursor-pointer"
                      }`}
                    >
                      <FileCode
                        size={14}
                        className={
                          selectedId === tech.id
                            ? "text-blue-500"
                            : "text-slate-400 dark:text-slate-500"
                        }
                      />
                      <span className="text-[12px] truncate cursor-pointer">
                        {tech.fileName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* editor group */}
            <div className="flex-grow flex flex-col bg-white dark:bg-slate-950 overflow-hidden z-10">
              <div className="h-9 bg-[#F3F3F3] dark:bg-slate-900 flex items-center border-b border-slate-200 dark:border-slate-700">
                <div className="bg-white dark:bg-slate-950 h-full px-4 border-r border-slate-200 dark:border-slate-700 flex items-center gap-2 min-w-[120px] lg:min-w-[140px] shadow-[0_-2px_0_inset_#2563eb]">
                  <FileCode size={14} className="text-blue-500" />
                  <span className="text-[11px] lg:text-[12px] text-slate-700 dark:text-slate-300 font-medium">
                    {activeTech.fileName}
                  </span>
                  <X
                    size={12}
                    className="ml-auto text-slate-400 dark:text-slate-500"
                  />
                </div>
              </div>

              <div
                className="flex-grow flex overflow-hidden bg-white dark:bg-slate-950"
                ref={editorRef}
              >
                <div className="hidden sm:flex w-10 pt-6 bg-[#FDFDFD] dark:bg-slate-950 border-r border-slate-100 dark:border-slate-800 flex-col items-center gap-1">
                  {[...Array(15)].map((_, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-slate-200 dark:text-slate-700"
                    >
                      {i + 1}
                    </span>
                  ))}
                </div>

                <div className="flex-grow p-5 lg:p-12 overflow-y-auto">
                  <div className="max-w-2xl mx-auto lg:mx-0">
                    <div className="mb-6 lg:mb-8 p-4 lg:p-6 rounded-2xl bg-slate-50/50 dark:bg-slate-900/70 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
                      <img
                        src={activeTech.icon}
                        alt=""
                        className="w-16 h-16 lg:w-24 lg:h-24 object-contain"
                      />
                      <div className="text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-2 text-blue-500 font-mono text-[9px] uppercase font-bold mb-1">
                          <Zap size={10} className="fill-blue-500" />
                          module_specs
                        </div>
                        <h3 className="text-2xl lg:text-4xl font-bold font-mono text-slate-900 dark:text-slate-100 uppercase">
                          {activeTech.name}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="font-mono text-[12px] lg:text-sm">
                        <span className="text-slate-300 dark:text-slate-600">
                          /**
                        </span>
                        <div className="pl-4 border-l-2 border-slate-100 dark:border-slate-800 my-1">
                          <p className="text-slate-500 dark:text-slate-400 font-mono text-xs lg:text-base leading-relaxed italic">
                            * {activeTech.desc}
                          </p>
                        </div>
                        <span className="text-slate-300 dark:text-slate-600">
                          {" "}
                          */
                        </span>
                      </div>

                      <div className="pt-4 lg:pt-6 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-[9px] font-mono text-slate-400 dark:text-slate-500 mb-3 uppercase tracking-widest">
                          {"// tags"}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {activeTech.labels.map((label, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 border border-blue-100 rounded-lg font-mono text-[9px] uppercase"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* status bar */}
              <div className="h-6 bg-blue-600 flex items-center justify-between px-3 text-[9px] text-white">
                <div className="flex items-center gap-3">
                  <GitBranch size={10} />
                  <span className="font-mono">main*</span>
                </div>
                <div className="flex items-center gap-3 font-mono opacity-80">
                  <span className="hidden sm:inline">UTF-8</span>
                  <span>
                    {activeTech.fileName.split(".").pop()?.toUpperCase() ||
                      "PLAINTEXT"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTech;
