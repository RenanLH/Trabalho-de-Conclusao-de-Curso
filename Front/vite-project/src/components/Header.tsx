import { useTranslation } from "react-i18next";
import SelectLanguage from "./SelectLanguage";
import { useEffect } from "react";

const Header = ({ texto = "", translate = false }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    let language = localStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);

    }
  }, [])

  const changeLanguage = (lang: string) => {

    i18n.changeLanguage(lang);

    localStorage.setItem("language", lang);

    const select = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement | null;

    if (select) {
      localStorage.setItem("language", lang);
      select.value = lang;
      document.cookie = `googtrans=/pt-PT/${lang}; path=/`;

      select.dispatchEvent(new Event("change"));

    }
  };

return (
    <header className="bg-gradient-to-tr from-blue-500 to-indigo-800 dark:from-blue-600 dark:to-indigo-950 text-white p-6 w-full min-w-full">
      <div className="flex-auto">
        <div className="justify-center text-center">
          {translate ?
            <h1 className="text-center text-4xl font-bold break-words">{texto}</h1>
            :
            <h1 className="text-center text-4xl font-bold notranslate break-words">{texto}</h1>
          }
        </div>
        <div className="flex justify-end mt-4 md:mt-3 text-center ">
          {<SelectLanguage changeLanguage={changeLanguage} />}
        </div>
      </div>
    </header>
  );
}

export default Header;