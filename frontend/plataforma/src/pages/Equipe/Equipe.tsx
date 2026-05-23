import TeamSection from "../../components/TeamSection/TeamSection";
import HeroDefault from "../../Layout/HeroDefault";
import { Heart } from "lucide-react";

const Equipe = () => {
  return (
    <main className="w-full bg-white dark:bg-slate-950">
      <HeroDefault
        titleBlack="Gente que"
        titleBlue="faz acontecer."
        description="Conheça as mentes por trás do LinkAid. Um time focado em criar soluções simples para conexões reais."
        scrollText="Nosso time, sua rede"
        ScrollIcon={Heart}
        highlightWord="focado"
      ></HeroDefault>
      <TeamSection />
    </main>
  );
};
export default Equipe;
