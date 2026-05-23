import { Outlet } from "react-router-dom";
import Header from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const DefaultLayout = () => {
  return (
    <div className="linkaid-site relative min-h-screen bg-white dark:bg-slate-950 text-slate-950 dark:text-slate-100 transition-colors duration-500">
      <Header />
      <main className="pt-20 overflow-x-clip">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default DefaultLayout;
