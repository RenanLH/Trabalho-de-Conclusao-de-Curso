import { useTranslation } from "react-i18next";
import Duvida from "../components/Duvida";
import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";

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

  useEffect(() => { 
    let language = sessionStorage.getItem("language");
    if (!language) 
      language = "pt";
    i18n.changeLanguage(language);

    getQuestions();

  },[]);


  async function getQuestions(){
    const url = "http://localhost:9875/api/duvidas";

    setDuvidas([]);

    const result = await axios.get(url);

    if (result.status == 200 || result.status == 304 ){
      console.log("OKKK");
      const resultArray = result.data as QaADB[];
      console.log(resultArray.length);
      
      resultArray.map((it, _index) => {
        const duvida = {question: it.pergunta, awnser: it.resposta};

        setDuvidas((prev) => [duvida, ...prev]);
      });

    }
    
  }

  return (
    <div>
      <body className="min-h-screen">
        <Header texto={t("Perguntas_Frequentes")} changeLanguage={(e:string) => {i18n.changeLanguage(e);}}/>

        <div className="flex flex-row sm:justify-start lg:justify-center mt-12">
          <div className=" rounded-lg container mx-auto">

            {duvidas.map((item, index)=> 
              <Duvida question={item.question} answer={item.awnser} key={index}/>
            )}

          </div>
        </div>
      </body>
      
    </div>
  );
};

export default PerguntasFrequentes;
