import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  User,
  Mail,
  MessageSquare,
  Loader2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import robotDesktop from "../../assets/images/contact/robot-right.png";
import robotMobile from "../../assets/images/contact/robot-top.png";

const contactSchema = z.object({
  name: z.string().min(3, "Digite seu nome completo"),
  email: z.string().email("E-mail inválido"),
  subject: z.string().min(3, "Digite um assunto"),
  message: z.string().min(10, "A mensagem precisa ser mais detalhada"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setSubmittedName(data.name.split(" ")[0]);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSuccess(true);
    reset();

    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <section className="w-full pt-1 -mt-10 pb-12 lg:pt-0 lg:-mt-10 lg:pb-32 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1200px] relative z-10 lg:pt-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:pl-32">
          <div className="flex flex-col text-center lg:text-right order-1 lg:order-2 lg:pr-10">
            <div className="flex flex-col gap-4 mb-10 items-center lg:items-end">
              <h2 className="text-[12vw] sm:text-[9vw] md:text-[6vw] lg:text-[4.5vw] font-bold text-slate-950 dark:text-white tracking-tighter leading-[0.85] md:leading-[0.85] lg:leading-[0.8]">
                Converse <br className="hidden lg:block" />
                <span className="text-blue-600 font-light lg:mr-0">
                  conosco.
                </span>
              </h2>

              <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed tracking-tight max-w-[440px] mt-4">
                Preencha o formulário ao lado. Nossa equipe analisará seu perfil
                e entrará em contato em menos de 24h.
              </p>
            </div>
          </div>

          <div className="w-full flex justify-center lg:justify-start order-2 lg:order-1 mt-40">
            <div className="relative w-full max-w-[480px]">
              <div className="absolute -top-50 left-1/2 -translate-x-1/2 w-[240px] md:-top-25 md:left-[65px] md:right-auto md:translate-x-0 z-30 animate-bounce duration-[2000ms]">
                <div className="bg-white dark:bg-slate-950 border-[1.5px] border-slate-900/30 dark:border-slate-700 p-5 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.06)] relative">
                  <p className="font-mono text-[11px] font-medium text-slate-700 dark:text-slate-300 text-center italic leading-tight">
                    Bip-bop! Identifique-se para que eu possa encaminhar sua
                    mensagem ao setor correto.
                  </p>
                  <div className="absolute bg-white dark:bg-slate-950 w-3 h-3 border-slate-900/30 dark:border-slate-700 -bottom-1.5 left-1/2 -translate-x-1/2 rotate-45 border-r-[1.5px] border-b-[1.5px] md:top-auto md:bottom-8 md:-left-1.5 md:right-auto md:translate-x-0 md:rotate-[135deg] md:border-r-[1.5px] md:border-b-[1.5px]"></div>
                </div>
              </div>

              <picture>
                <source media="(max-width: 768px)" srcSet={robotMobile} />
                <img
                  src={robotDesktop}
                  alt="Robot"
                  className="absolute -top-25 left-1/2 -translate-x-1/2 w-[150px] md:-top-24 md:right-auto md:left-[-87px] md:translate-x-0 lg:-top-29 lg:left-[-105px] lg:w-[180px] scale-x-[-1] pointer-events-none select-none z-20 transition-all duration-500"
                />
              </picture>

              <div
                className="bg-white dark:bg-slate-950 p-8 lg:p-10 rounded-[32px] border border-slate-100/60 dark:border-slate-800/80 relative z-10"
                style={{
                  boxShadow:
                    "0 0 50px rgba(0,0,0,0.12), 0 0 20px rgba(0,0,0,0.05)",
                }}
              >
                {!isSuccess ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-[0.2em] ml-1">
                        Nome Completo
                      </label>
                      <div
                        className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-950 border transition-all duration-300 focus-within:shadow-md dark:focus-within:shadow-blue-950/20 focus-within:border-blue-600 ${errors.name ? "border-red-200" : "border-slate-200 dark:border-slate-700"}`}
                      >
                        <User size={18} className="text-slate-400 dark:text-slate-500" />
                        <input
                          {...register("name", { required: true })}
                          placeholder="Ex: João da Silva"
                          className="bg-transparent w-full outline-none text-slate-800 dark:text-slate-200 text-sm font-light placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        />
                      </div>
                      {errors.name && (
                        <span className="text-[10px] font-bold text-red-400 uppercase tracking-tight ml-1">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    {/* email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-[0.2em] ml-1">
                        E-mail Corporativo
                      </label>
                      <div
                        className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-950 border transition-all duration-300 focus-within:shadow-md dark:focus-within:shadow-blue-950/20 focus-within:border-blue-600 ${errors.email ? "border-red-200" : "border-slate-200 dark:border-slate-700"}`}
                      >
                        <Mail size={18} className="text-slate-400 dark:text-slate-500" />
                        <input
                          {...register("email", { required: true })}
                          placeholder="nome@empresa.com"
                          className="bg-transparent w-full outline-none text-slate-800 dark:text-slate-200 text-sm font-light placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        />
                      </div>
                      {errors.email && (
                        <span className="text-[10px] font-bold text-red-400 uppercase tracking-tight ml-1">
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    {/* assunto */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-[0.2em] ml-1">
                        Assunto
                      </label>
                      <div
                        className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-950 border transition-all duration-300 focus-within:shadow-md dark:focus-within:shadow-blue-950/20 focus-within:border-blue-600 ${errors.subject ? "border-red-200" : "border-slate-200 dark:border-slate-700"}`}
                      >
                        <MessageSquare size={18} className="text-slate-400 dark:text-slate-500" />
                        <input
                          {...register("subject", { required: true })}
                          placeholder="Ex: Parceria, Dúvidas..."
                          className="bg-transparent w-full outline-none text-slate-800 dark:text-slate-200 text-sm font-light placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        />
                      </div>
                      {errors.subject && (
                        <span className="text-[10px] font-bold text-red-400 uppercase tracking-tight ml-1">
                          {errors.subject.message}
                        </span>
                      )}
                    </div>

                    {/* message */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-[0.2em] ml-1">
                        Sua Mensagem
                      </label>
                      <div
                        className={`flex items-start gap-4 px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-950 border transition-all duration-300 focus-within:shadow-md dark:focus-within:shadow-blue-950/20 focus-within:border-blue-600 ${errors.message ? "border-red-200" : "border-slate-200 dark:border-slate-700"}`}
                      >
                        <MessageSquare
                          size={18}
                          className="text-slate-400 dark:text-slate-500 mt-1"
                        />
                        <textarea
                          {...register("message", { required: true })}
                          rows={2}
                          placeholder="Como podemos te ajudar?"
                          className="bg-transparent w-full outline-none text-slate-800 dark:text-slate-200 text-sm font-light placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none"
                        />
                      </div>
                      {errors.message && (
                        <span className="text-[10px] font-bold text-red-400 uppercase tracking-tight ml-1">
                          {errors.message.message}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-start pt-2">
                      <button
                        disabled={isSubmitting}
                        className="flex items-center gap-4 text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] group cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                        <div className="w-12 h-12 rounded-full border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                          {isSubmitting ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <ArrowRight size={16} />
                          )}
                        </div>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="py-20 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/45 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                      <CheckCircle2 size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight mb-2">
                      Mensagem recebida!
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 font-light text-sm max-w-[280px]">
                      Obrigado,{" "}
                      <span className="font-bold text-blue-600">
                        {submittedName}
                      </span>
                      !<br />
                      Nossa equipe entrará em contato em menos de 24h.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
