import HeroDefault from "@/layouts/HeroDefault";
import { MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm/ContactForm";
import ContactInfo from "@/components/ContactInfo/ContactInfo";
import ContactMap from "@/components/ContactMap/ContactMap";

const Contato = () => {
  return (
    <main className="w-full bg-white dark:bg-slate-950">
      <HeroDefault
        titleBlack="Adoramos uma"
        titleBlue="boa conversa."
        description="Tem alguma dúvida ou quer saber mais sobre o projeto? Nossa equipe está pronta para ouvir você e criar conexões reais."
        scrollText="Fale conosco"
        ScrollIcon={MessageCircle}
        highlightWord="pronta"
      >
        <ContactInfo />
      </HeroDefault>
      <ContactForm />
      <ContactMap />
    </main>
  );
};
export default Contato;
