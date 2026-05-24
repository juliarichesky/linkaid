
import AboutMeaning from "@/components/AboutMeaning/AboutMeaning";
import AboutScrollCards from "@/components/AboutScrollCards/AboutScrollCards";
import AboutFeaturesOrbit from "@/components/AboutFeaturesOrbit/AboutFeaturesOrbit";
import AboutPerformance from "@/components/AboutPerformance/AboutPerformance";
import AboutProject from "@/components/AboutProject/AboutProject";
import AboutTech from "@/components/AboutTech/AboutTech";
import AboutClosing from "@/components/AboutClosing/AboutClosing";

const Sobre = () => {
  return (
    <main className="w-full bg-white dark:bg-slate-950">
      <AboutScrollCards />
      <AboutMeaning />
      <AboutFeaturesOrbit />
      <AboutPerformance />
      <AboutProject />
      <AboutTech />
      <AboutClosing />
    </main>
  );
};
export default Sobre;
