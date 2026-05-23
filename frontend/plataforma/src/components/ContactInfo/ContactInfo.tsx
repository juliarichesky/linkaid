import { Mail, Phone } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="w-full lg:max-w-[800px] mt-10 lg:mt-14 px-6 md:px-8 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 mx-auto lg:mx-0">
      {/* grid */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start gap-x-16 gap-y-10">
        {/* telefone */}
        <a
          href="tel:+5511999999999"
          className="flex flex-col lg:flex-row items-center lg:items-center gap-4 group cursor-pointer text-center lg:text-left"
        >
          <div className="w-12 h-12 shrink-0 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-blue-600 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:border-blue-200">
            <Phone size={20} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 mb-0.5">
              Telefone
            </p>
            <p className="text-slate-500 dark:text-slate-400 font-light tracking-tight text-base lg:text-md group-hover:text-blue-600 transition-colors">
              +55 (11) 99999-9999
            </p>
          </div>
        </a>

        {/* email */}
        <a
          href="mailto:contato@linkaid.com"
          className="flex flex-col lg:flex-row items-center lg:items-center gap-4 group cursor-pointer text-center lg:text-left"
        >
          <div className="w-12 h-12 shrink-0 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-blue-600 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:border-blue-200">
            <Mail size={20} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 mb-0.5">
              E-mail
            </p>
            <p className="text-slate-500 dark:text-slate-400 font-light tracking-tight text-base lg:text-md group-hover:text-blue-600 transition-colors">
              contato@linkaid.com
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};
export default ContactInfo;
