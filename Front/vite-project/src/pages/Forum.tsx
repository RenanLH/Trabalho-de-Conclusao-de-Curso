import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import ListCard from "../components/ListCard";
import { useEffect } from "react";

const Forum = () => {
  const { t, i18n } = useTranslation();

   useEffect(() => { 
      let language = sessionStorage.getItem("language");
      if (!language) 
        language = "pt";
      i18n.changeLanguage(language);
    },[]);
  
  return (
    <div>
      <div>
        <Header texto={t("Forum")} changeLanguage={(e:string) => {
          i18n.changeLanguage(e);
          }}/>
      </div>
      
      <div className="flex flex-row">
        <ListCard />
      </div>

    </div>
  );
};

export default Forum;
