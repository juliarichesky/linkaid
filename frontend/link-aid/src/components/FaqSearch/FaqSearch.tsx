import { Search, X, ArrowRight, HelpCircle } from "lucide-react";
import { faqData } from "../../data/faq";
import { useMemo } from "react";

interface FaqSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSuggestionClick?: (id: string) => void; // click - id
}

const FaqSearch = ({
  searchTerm,
  onSearchChange,
  onSuggestionClick,
}: FaqSearchProps) => {
  const suggestions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (term.length < 2) return [];
    return faqData
      .filter((item) => item.question.toLowerCase().includes(term))
      .slice(0, 5);
  }, [searchTerm]);

  // function for id
  const handleSelectSuggestion = (id: string) => {
    if (onSuggestionClick) {
      onSuggestionClick(id);
    }
  };

  return (
    <div className="flex flex-col items-center lg:items-start w-full relative">
      <div className="relative group z-50 w-full max-w-[90%] md:max-w-[520px] xl:max-w-[750px]">
        <Search
          className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-600 transition-colors"
          size={22}
        />

        <input
          type="text"
          placeholder="O que você está procurando?"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-16 pr-16 py-4 md:py-6 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-4 focus:ring-blue-50/50 dark:focus:ring-blue-950/40 focus:border-blue-600 transition-all duration-300 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm md:text-lg font-medium"
        />

        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        )}

        {suggestions.length > 0 && (
          <div className="absolute top-[calc(100%+12px)] left-0 w-full bg-white dark:bg-slate-950 rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.25)] border border-slate-100 dark:border-slate-800 overflow-hidden z-[999] animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="px-8 pt-6 pb-2 bg-white dark:bg-slate-950">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                Sugestões Encontradas
              </span>
            </div>

            <div className="p-3 bg-white dark:bg-slate-950">
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectSuggestion(item.id)} // id
                  className="w-full flex items-center gap-4 px-6 py-4 rounded-[1.8rem] hover:bg-blue-50 transition-all duration-300 text-left group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/45 flex items-center justify-center group-hover:bg-blue-600 transition-colors shrink-0">
                    <HelpCircle
                      size={18}
                      className="text-blue-600 group-hover:text-white transition-colors"
                    />
                  </div>

                  <div className="flex-grow">
                    <span className="text-slate-800 dark:text-slate-200 font-bold text-sm lg:text-base block leading-tight">
                      {item.question}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-medium mt-1 block">
                      Tópico Suporte #{item.id}
                    </span>
                  </div>

                  <div className="p-2 bg-blue-50 dark:bg-blue-950/45 rounded-lg text-blue-600 opacity-0 group-hover:opacity-100 transition-all">
                    <ArrowRight size={14} />
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 px-8 py-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                Clique em uma sugestão para selecionar
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqSearch;
