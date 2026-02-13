import logo_unioeste from "../assets/logomarca_Unioeste_jpg-Photoroom.png"
import logo_inicio from "../assets/home-svgrepo-com.svg"
import logo_help from "../assets/help-info-question-support-svgrepo-com.svg"
import logo_forum from "../assets/list-svgrepo-com.svg"
import logo_login from "../assets/user-circle-svgrepo-com.svg"
import logo_mail from "../assets/mail-svgrepo-com.svg"
import SearchBar from "./SearchBar";
import { useTranslation } from "react-i18next";
import GoogleTranslate from "./GoogleTranslate";
import { isLogged } from "../util/util";
import UserMenu from "./UserMenu";
import { useState, useRef, useEffect } from 'react';


const Navbar = () => {

  const { t } = useTranslation();
  const [showComponent, setShowComponent] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    let theme = sessionStorage.getItem("theme");
    if (theme === 'dark') {
      setIsDarkMode(true)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowComponent(false);
      }
    };

    if (showComponent) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showComponent]);

  const onClick = (href: string) => {
    window.location.href = href;
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);

    sessionStorage.setItem("theme", isDarkMode ? "light" : "dark")
    document.documentElement.classList.toggle('dark');

  }

  const onLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("idUsuario");
    sessionStorage.removeItem("nomeUsuario");

    window.location.href = "/home";
  }

  return (
    <div className="flex flex-col lg:flex-row items-center p-2 notranslate bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 ">

      <div className="flex w-full lg:w-2/5 items-center justify-between lg:justify-start mb-4 lg:mb-0">
        <a href="https://www.unioeste.br/portal/" className="shrink-0">
          <img className="h-16 md:h-20 ml-3.5" src={logo_unioeste} alt="Logo Unioeste" />
        </a>
        <div className="flex-grow max-w-md ml-4">
          <SearchBar isDarkMode={isDarkMode} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center lg:justify-end flex-1 gap-4 md:gap-8 w-full lg:mr-10 ">
        <GoogleTranslate />

        <div className="flex items-center gap-2">
          <button className="flex items-center rounded p-1  " onClick={() => onClick("/home")}>
            <img className="h-8 md:h-10 dark:invert" src={logo_inicio} alt="Início" />
            <span className=" ml-2 hidden sm:block text-sm md:text-base">{t("Inicio")}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center rounded p-1" onClick={() => onClick("/duvidas")}>
            <img className="h-8 md:h-10 dark:invert" src={logo_help} alt="Perguntas Frequentes" color="blue" />
            <span className="ml-2 hidden sm:block text-sm md:text-base">{t("Perguntas_Frequentes")}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center rounded p-1 " onClick={() => onClick("/forum")}>
            <img className="h-8 md:h-10 dark:invert" src={logo_forum} alt="Fórum" />
            <span className="ml-2 hidden sm:block text-sm md:text-base">{t("Forum")}</span>
          </button>
        </div>

        {isLogged() && (
          <div className="flex items-center gap-2">
            <button className="flex items-center rounded p-1 " onClick={() => onClick("/mensagens")}>
              <img className="h-8 md:h-10 dark:invert" src={logo_mail} alt="Mensagens" />
              <span className=" ml-2 hidden sm:block text-sm md:text-base">{t("Minhas Mensagens")}</span>
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          {isLogged() ? (
            <div className="flex items-center gap-2">
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowComponent(!showComponent)}
                  className="flex items-center rounded p-1 transition-all">
                  <img className="h-8 md:h-10 dark:invert" src={logo_login} alt="Logout" />
                  <span className="ml-2 hidden sm:block text-sm md:text-base">{t("Conta")}</span>
                </button>

                {showComponent && (
                  <div className="absolute right-0 top-full mt-2 z-50">
                    <UserMenu
                      showComponent={setShowComponent}
                      isDarkMode={isDarkMode}
                      toggleTheme={toggleTheme}
                      onLogout={onLogout}
                      onNavigate={(path) => console.log('Indo para:', path)}
                    />

                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button className="flex items-center rounded p-1 " onClick={() => onClick("/login")}>
                <img className="h-8 md:h-10 dark:invert" src={logo_login} alt="Login" />
                < span className="ml-2 hidden sm:block text-sm md:text-base">{t("Login")}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
