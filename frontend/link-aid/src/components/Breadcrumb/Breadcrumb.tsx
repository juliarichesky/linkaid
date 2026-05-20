import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Home } from "lucide-react";

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  // funçao para lidar com o clique no voltar
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault(); // evita o comportamento padrão de link
    navigate(-1); // O "-1" faz o navegador voltar para a pag anterior
  };

  return (
    <nav className="flex flex-col items-center lg:flex-row lg:justify-start gap-4 lg:gap-8 mb-8 md:mb-12 w-full animate-in fade-in slide-in-from-top-4 duration-700">
      {/* voltar para a pagina anterior */}
      <button
        onClick={handleBack}
        className="group flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em] w-fit shrink-0 transition-colors hover:text-blue-700 cursor-pointer"
      >
        <ArrowLeft
          size={14}
          className="transition-transform group-hover:-translate-x-1"
        />
        Voltar
      </button>

      <div className="hidden lg:block w-[1px] h-3 bg-slate-400" />

      <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-[0.2em] font-semibold flex-wrap">
        <Link
          to="/"
          className="hover:text-blue-600 transition-colors flex items-center gap-1.5"
        >
          <Home size={13} className="text-slate-500 dark:text-slate-400" />
          Início
        </Link>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const displayName =
            value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");

          return (
            <div key={to} className="flex items-center gap-2">
              <ChevronRight
                size={14}
                className="text-slate-400 dark:text-slate-500"
                strokeWidth={3}
              />
              {last ? (
                <span className="text-slate-900 dark:text-slate-100 font-bold">{displayName}</span>
              ) : (
                <Link to={to} className="hover:text-blue-600 transition-colors">
                  {displayName}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumb;
