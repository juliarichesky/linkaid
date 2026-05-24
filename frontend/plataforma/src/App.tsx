import { Navigate, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/site/Home/Home";
import Sobre from "./pages/site/Sobre/Sobre";
import Equipe from "./pages/site/Equipe/Equipe";
import Faq from "./pages/site/Faq/Faq";
import Contato from "./pages/site/Contato/Contato";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Mapa from "./pages/site/Mapa/Mapa";
import NotFound from "./pages/site/NotFound/NotFound";
import TeamDetails from "./components/TeamDetails/TeamDetails";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb";
import PlatformApp from "./routes/PlatformRoutes";

const App = () => {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/equipe/:id" element={<TeamDetails />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/breadcrumb" element={<Breadcrumb />} />
        </Route>
        <Route path="/solucao" element={<Navigate to="/plataforma" replace />} />
        <Route path="/painel" element={<Navigate to="/plataforma" replace />} />
        <Route path="/plataforma/*" element={<PlatformApp />} />
      </Routes>
    </>
  );
};

export default App;
