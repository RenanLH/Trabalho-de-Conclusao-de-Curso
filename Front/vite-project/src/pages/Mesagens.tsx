import Header from "../components/Header";
import ListMensagens from "../components/ListMensagens";

import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const Mensagens = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => { 

    let token = sessionStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    }

    let language = sessionStorage.getItem("language");
    if (!language) 
      language = "pt";
    i18n.changeLanguage(language);
  },[]);
  
  return (
    <div>
      <Header texto={t("Minhas Mensagens")} changeLanguage={(e:string) => {i18n.changeLanguage(e);}}/>

      <div className="flex">
        <ListMensagens />
      </div>

    </div>
  );
};

export default Mensagens;