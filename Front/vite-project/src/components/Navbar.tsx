import { Link } from "react-router-dom";
import logo_unioeste from "../assets/logomarca_Unioeste_jpg-Photoroom.png"
import logo_inicio from "../assets/home-svgrepo-com.svg"
import logo_help from "../assets/help-info-question-support-svgrepo-com.svg"
import logo_forum from "../assets/list-svgrepo-com.svg"
import logo_login from "../assets/user-circle-svgrepo-com.svg"
import logo_mail from "../assets/mail-svgrepo-com.svg"
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Navbar = () => {

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {

    const token = sessionStorage.getItem("token");

    console.log('token',token);

    setIsLogged(token != null);
  });

  return (
    <div className="flex flex-wrap p-2 border-3 border-b-gray-400 ">
      <div className="flex w-full lg:w-1/2 sm:w-full items-center  mb-4 ">
        <a href="https://www.unioeste.br/portal/">
          <img className="h-20 ml-3.5 "  src={logo_unioeste} alt="Logo Unioeste" />
        </a>
        <div className="flex-grow">
          <SearchBar />
        </div>
      </div>

      <div className="flex flex-auto justify-end gap-8 flex-wrap mr-10">
        
        <div className="flex items-center gap-2 mb-4">
          <Link to="/home">
            <img className="h-10" src={logo_inicio} alt="Início" />
          </Link>
          <p className="mt-2">{t("Inicio")}</p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Link to="/duvidas">
            <img className="h-10" src={logo_help} alt="Perguntas Frequentes" />
          </Link>
          <p className="mt-2">{t("Perguntas_Frequentes")}</p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Link to="/forum">
            <img className="h-10" src={logo_forum} alt="Fórum" />
          </Link>
          <p className="mt-2">{t("Forum")}</p>
        </div>

        {!isLogged && (
          <div className="flex items-center gap-2 mb-4">
            <Link to="/mensagens">
              <img className="h-10" src={logo_mail} alt="Mensagens" />
            </Link>
            <p className="mt-2">{t("Mensagens")}</p>
          </div>
        )}

        <div className="flex items-center gap-2 mb-4">
          {isLogged ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <img className="h-10" src={logo_login} alt="Logout" />
              </Link>
              <p className="mt-2">Conta</p>
            </div>
          )
      : 
          (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <img className="h-10" src={logo_login} alt="Login" />
              </Link>
              <p className="mt-2">{t("Login")}</p>
            </div>
          )}


          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
