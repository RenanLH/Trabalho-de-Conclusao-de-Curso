import { useTranslation } from "react-i18next";
import Header from "../components/Header";

const Home = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
    
    <Header texto={t("Plataforma para auxilio de Migrantes e Refugiados")} changeLanguage={(e:string) => {
    i18n.changeLanguage(e)}}/>
    

    <main className="flex-grow p-6">

    <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">{t("Projeto de Trabalho de conclusão de curso")}</h2>
        <p>
         {t("Sobre_Tcc")}
        </p>
      </section>
      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">{t("Clínica de Direitos Fundamentais e Migração")}</h2>
        <p>
          {t("Sobre_Clinica")}

        </p>
      </section>

      

    </main>

    <footer className="bg-blue-700 text-white p-4 text-center">
    </footer>
  </div>
  );
};

export default Home;
