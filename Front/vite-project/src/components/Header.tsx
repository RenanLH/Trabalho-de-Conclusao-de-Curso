import { useTranslation } from "react-i18next";
import SelectLanguage from "./SelectLanguage";
import { useEffect } from "react";

const Header = ({ texto = "", translate = false }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    let language = sessionStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);

    }
  }, [])

  const changeLanguage = (lang: string) => {

    i18n.changeLanguage(lang);

    sessionStorage.setItem("language", lang);

    const select = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement | null;

    if (select) {
      sessionStorage.setItem("language", lang);
      select.value = lang;
      document.cookie = `googtrans=/pt-PT/${lang}; path=/`;

      select.dispatchEvent(new Event("change"));

    }
  };

  return (
    <header className="bg-gradient-to-tr from-blue-500 to-indigo-800 dark:from-blue-600 dark:to-indigo-950  text-white p-6 w-full min-w-full">
      <div className="flex-auto">
        <div className="justify-center text-center">
          {translate ?
            <h1 className="text-center text-4xl font-bold">{texto}</h1>
            :
            <h1 className="text-center text-4xl font-bold notranslate">{texto}</h1>
          }
        </div>
        <div className="flex justify-end text-center ">
          {<SelectLanguage changeLanguage={changeLanguage} />}
        </div>
      </div>
    </header>
  );
}

export default Header;