import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import ListCard from "../components/ListCard";

const Forum = () => {
  const { t, i18n } = useTranslation();
  
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
      <footer className="bg-blue-700 text-white p-4 position-absolute bottom-0 w-full">
      </footer>
    </div>
  );
};

export default Forum;
