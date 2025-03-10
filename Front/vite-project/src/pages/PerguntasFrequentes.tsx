import { useTranslation } from "react-i18next";
import Duvida from "../components/Duvida";
import Header from "../components/Header";
import SelectLanguage from "../components/SelectLanguage";
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
  const [duvidasDB, setDuvidasDB] = useState<QaADB[]>([])

  useEffect(() => {
    getQuestions()
  },[]);


  async function getQuestions(){
    const url = "http://localhost:9875/duvidas";

    setDuvidas([]);

    const result = await axios.get(url);

    if (result.status == 200 || result.status == 304 ){
      console.log("OKKK");
      const resultArray = result.data as QaADB[];
      console.log(resultArray.length);
      
      resultArray.map((it, _index) => {
        //const element =  <Duvida question={it.questionPT} answer={it.awnserPT}/>
       setDuvidasDB((prev) => [it, ...prev]);

        const duvida = {question: it.pergunta, awnser: it.resposta};

        setDuvidas((prev) => [duvida, ...prev]);
      });

    }
    
  }

 function onChangeLanguage(language: String){
    setDuvidas([]);
    if (language == "pt"){
      duvidasDB.map((it, _index) => {
        //const element =  <Duvida question={it.questionPT} answer={it.awnserPT}/>

        let duvida = {question: it.pergunta, awnser: it.resposta};

        setDuvidas((prev) => [duvida, ...prev]);
      });
    }
    else if(language == "es") {
      duvidasDB.map((it, _index) => {
        //const element =  <Duvida question={it.questionPT} answer={it.awnserPT}/>
        let duvida = {question: it.pergunta, awnser: it.resposta};
        if (duvida.question == "" && duvida.awnser == ""){
          duvida = {question: it.pergunta, awnser: it.resposta }
        }   
        setDuvidas((prev) => [duvida, ...prev]);
      });
    }

    else if(language == "en") {
      duvidasDB.map((it, _index) => {
        //const element =  <Duvida question={it.questionPT} answer={it.awnserPT}/>
        let duvida = {question: it.pergunta, awnser: it.resposta};

        if (it.pergunta == "" && it.resposta == ""){

          duvida = {question: it.pergunta, awnser: it.resposta }
        }   
        setDuvidas((prev) => [duvida, ...prev]);
      });
    }
 }

  return (
    <div>
        <Header texto={t("Perguntas_Frequentes")} changeLanguage={(e:string) => {i18n.changeLanguage(e);}}/>

      <div className=" flex-auto text-center">
      </div>
      <div className="flex flex-row sm:justify-start lg:justify-center mt-12">
        <div className=" rounded-lg container mx-auto">

          {duvidas.map((item, index)=> 
            <Duvida question={item.question} answer={item.awnser} key={index}/>
          )}

        </div>
      </div>
      <footer className="bg-blue-700 text-white p-4 position-absolute bottom-0 w-full">
      </footer>
    </div>
  );
};

export default PerguntasFrequentes;
