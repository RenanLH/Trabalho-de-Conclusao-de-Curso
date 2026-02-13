import { useTranslation } from "react-i18next";
import Duvida from "../components/Duvida";
import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import logo_mensagem from "../assets/add-svgrepo-com.svg";
import { API_BASE_URL } from "../util/config";
import CriarNovaFaq from "../components/CriarNovaFaq";
import { isAdmin } from "../util/util"

type QaADB = {
  _id: string,
  pergunta: string,
  resposta: string,
};

type QaA = {
  question: string,
  awnser: string,
};

const PerguntasFrequentes = () => {
  const { t, i18n } = useTranslation();
  const [duvidas, setDuvidas] = useState<QaA[]>([])
  const [showNewFaq, setShowNewFaq] = useState(false);

  useEffect(() => {

    let theme = sessionStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }

    let language = sessionStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);
    }

    getQuestions();

  }, []);

  function onClickPergunta(show: boolean) {
    setShowNewFaq(show);
  }

  async function getQuestions() {
    const url = `${API_BASE_URL}/duvidas`;

    setDuvidas([]);

    const result = await axios.get(url);

    if (result.status == 200 || result.status == 304) {
      const resultArray = result.data as QaADB[];
      console.log(resultArray.length);

      resultArray.map((it, _index) => {
        const duvida = { question: it.pergunta, awnser: it.resposta };

        setDuvidas((prev) => [duvida, ...prev]);
      });

    }
  }

  return (
    <div className="bg-gray-100 dark:bg-slate-800/80 min-h-screen">
      <Header texto={t("Perguntas_Frequentes")} />

      <div className="flex flex-row sm:justify-start lg:justify-center mt-12">
        <div className=" rounded-lg container mx-auto">

          {duvidas.map((item, index) =>
            <Duvida question={item.question} answer={item.awnser} key={index} />
          )}


          {isAdmin() &&
            <div className="fixed bottom-44 right-4">
              <img className="size-20 cursor-pointer " src={logo_mensagem} alt="Nova Pergunta" onClick={() => onClickPergunta(true)} />
            </div>
          }
        </div>

        {showNewFaq && <CriarNovaFaq showComponent={onClickPergunta} />}
      </div>

    </div>
  );
};

export default PerguntasFrequentes;
