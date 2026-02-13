import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { useEffect, useState } from "react";

const Home = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {

    let theme = sessionStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }

    let language = sessionStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);
    }
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-slate-800/80 min-h-screen flex flex-col">

      <Header texto={t("Plataforma para auxilio de Migrantes e Refugiados")} />

      <main className="flex-grow p-6 notranslate">

        <section className="dark:bg-slate-900 dark:text-slate-50 bg-slate-50 text-slate-900 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">{t("Projeto de Trabalho de conclusão de curso")}</h2>
          <p>{t("Sobre_Tcc")}</p>
        </section>

        <section className="dark:bg-slate-900 dark:text-slate-50 bg-slate-50 text-slate-900 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">{t("Clínica de Direitos Fundamentais e Migração")}</h2>
          <p>{t("Sobre_Clinica")}</p>
        </section>

      </main>

    </div>
  );
};

export default Home;
