import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import ListMensagens from "../components/ListMensagens";

const Mensagens = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <Header texto={t("Minhas Mensagens")} changeLanguage={(e:string) => {i18n.changeLanguage(e);}}/>

      <div className="flex flex-row">
        <ListMensagens />
      </div>

      <footer className="bg-blue-700 text-white p-4 position-absolute bottom-0 w-full">
      </footer>
    </div>
  );
};

export default Mensagens;