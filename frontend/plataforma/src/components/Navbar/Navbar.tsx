import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Home,
  Info,
  Users,
  HelpCircle,
  Mail,
  Lightbulb,
  ArrowRight,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import logo from "../../assets/icons/logo.png";
import { useTheme } from "../../contexts/ThemeContext";
import { platformPath } from "../../platform/lib/routes";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const menuRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  useGSAP(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.6,
        ease: "power4.out",
        visibility: "visible",
      });
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        visibility: "visible",
      });
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power4.in",
        onComplete: () => {
          gsap.set(menuRef.current, { visibility: "hidden" });
        },
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(overlayRef.current, { visibility: "hidden" });
        },
      });
    }
  }, [isMenuOpen]);

  const menuLinks = [
    { name: "Início", to: "/", icon: <Home size={18} />, external: false },
    { name: "Sobre", to: "/sobre", icon: <Info size={18} />, external: false },
    { name: "Equipe", to: "/equipe", icon: <Users size={18} />, external: false },
    {
      name: "Solução",
      to: platformPath("/"),
      icon: <Lightbulb size={18} />,
      external: false,
    },
    { name: "FAQ", to: "/faq", icon: <HelpCircle size={18} />, external: false },
    { name: "Contato", to: "/contato", icon: <Mail size={18} />, external: false },
  ];

  const buttonBaseClass =
    "w-10 h-10 flex items-center justify-center rounded-full bg-slate-900/5 border border-slate-950/10 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-sm cursor-pointer active:scale-95 z-[150]";

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-4 pt-0 md:px-10 font-sans">
      {/* nav desktop */}
      <div
        className={`max-w-[2000px] mx-auto h-20 px-8 flex items-center justify-between rounded-b-[2rem] transition-all duration-500 shadow-2xl relative z-[120] ${
          isMenuOpen
            ? "opacity-0 invisible pointer-events-none"
            : "bg-white/10 dark:bg-slate-950/70 backdrop-blur-xl border border-white/20 dark:border-blue-400/15 border-t-0 opacity-100 visible"
        }`}
      >
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          <img src={logo} alt="LinkAid" className="h-7 md:h-8 opacity-90" />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-8 font-bold text-[10px] tracking-[0.2em] uppercase">
            {menuLinks.map((link) => {
              const isActive = location.pathname === link.to;

              const linkStyles = `transition-all relative group py-2 ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-900/80 dark:text-slate-100/85 hover:text-blue-600"
              }`;

              const linkContent = (
                <>
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-blue-600 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              );

              return link.external ? (
                <a
                  key={link.name}
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkStyles}
                >
                  {linkContent}
                </a>
              ) : (
                <Link key={link.name} to={link.to} className={linkStyles}>
                  {linkContent}
                </Link>
              );
            })}
          </div>

          <button
            onClick={toggleTheme}
            className={buttonBaseClass}
            aria-label={isDark ? "Ativar modo claro" : "Ativar modo noturno"}
          >
            {isDark ? (
              <Sun size={16} className="text-amber-500" />
            ) : (
              <Moon size={16} className="text-blue-500" />
            )}
          </button>
        </div>
      </div>

      {/* mobile buttons */}
      <div className="md:hidden fixed top-5 right-8 flex items-center gap-3 z-[150]">
        <button
          onClick={toggleTheme}
          className={buttonBaseClass}
          aria-label={isDark ? "Ativar modo claro" : "Ativar modo noturno"}
        >
          {isDark ? (
            <Sun size={16} className="text-amber-500" />
          ) : (
            <Moon size={16} className="text-blue-500" />
          )}
        </button>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={buttonBaseClass}
        >
          {isMenuOpen ? (
            <X size={20} className="text-slate-700 dark:text-slate-300" />
          ) : (
            <Menu size={20} className="text-slate-700 dark:text-slate-300" />
          )}
        </button>
      </div>

      {/* overlay */}
      <div
        ref={overlayRef}
        onClick={() => setIsMenuOpen(false)}
        className="fixed inset-0 bg-slate-950/10 backdrop-blur-md z-[105]"
        style={{ opacity: 0, visibility: "hidden" }}
      />

      {/* menu mobile open */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-[75%] max-w-[300px] bg-white/95 dark:bg-slate-950/95 backdrop-blur-3xl border-l border-white/20 dark:border-blue-400/15 shadow-2xl z-[110] flex flex-col md:hidden"
        style={{ transform: "translateX(100%)", visibility: "hidden" }}
      >
        <div className="pt-32 pb-10 px-8 flex flex-col h-full">
          <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-10 opacity-70">
            Menu
          </p>

          <div className="flex flex-col gap-4">
            {menuLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`group flex items-center justify-between py-2 transition-all ${
                    isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`transition-colors ${isActive ? "text-blue-600" : "text-slate-500 dark:text-slate-400 group-hover:text-blue-600"}`}
                    >
                      {link.icon}
                    </span>
                    <span
                      className={`text-[16px] tracking-tight transition-all ${
                        isActive
                          ? "font-bold text-blue-600"
                          : "font-medium text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {link.name}
                    </span>
                  </div>
                  <ArrowRight
                    size={14}
                    className={`transition-all ${isActive ? "text-blue-600 translate-x-1" : "text-slate-200 dark:text-slate-700 group-hover:text-blue-600"}`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="mt-auto text-center border-t border-slate-100 dark:border-slate-800 pt-6">
            <p className="text-slate-500 dark:text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em]">
              LinkAid • 2026
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
