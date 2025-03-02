import Duvida from "../components/Duvida";
import SelectLanguage from "../components/SelectLanguage";
import axios from "axios";
import { useState, useEffect } from "react";

type QaADB = {
  questionPT: string,
  awnserPT: string,

  questionES: string,
  awnserES: string,

  questionEN: string,
  awnserEN: string,
};

type QaA = {
  question: string,
  awnser: string,
};


const PerguntasFrequentes = () => {

  const [duvidas, setDuvidas] = useState<QaA[]>([])
  const [duvidasDB, setDuvidasDB] = useState<QaADB[]>([])

  useEffect(() => {
    getQuestions()
  },[]);


  async function getQuestions(){
    const url = "http://localhost:7000/duvidas";

    setDuvidas([]);

    const result = await axios.get(url);

    if (result.status == 200 ){
      const resultArray = result.data as QaADB[];
      console.log(resultArray.length);
      
      resultArray.map((it, _index) => {
        //const element =  <Duvida question={it.questionPT} answer={it.awnserPT}/>
        setDuvidasDB((prev) => [it, ...prev]);

        const duvida = {question: it.questionPT, awnser: it.awnserPT};

        setDuvidas((prev) => [duvida, ...prev]);
      });

    }
    
  }

 function onChangeLanguage(language: String){
    setDuvidas([]);
    if (language == "pt"){
      duvidasDB.map((it, _index) => {
        //const element =  <Duvida question={it.questionPT} answer={it.awnserPT}/>

        let duvida = {question: it.questionPT, awnser: it.awnserPT};

        setDuvidas((prev) => [duvida, ...prev]);
      });
    }
    else if(language == "es") {
      duvidasDB.map((it, _index) => {
        //const element =  <Duvida question={it.questionPT} answer={it.awnserPT}/>
        let duvida = {question: it.questionES, awnser: it.awnserES};
        if (duvida.question == "" && duvida.awnser == ""){
          duvida = {question: it.questionPT, awnser: it.awnserPT }
        }   
        setDuvidas((prev) => [duvida, ...prev]);
      });
    }

    else if(language == "en") {
      duvidasDB.map((it, _index) => {
        //const element =  <Duvida question={it.questionPT} answer={it.awnserPT}/>
        let duvida = {question: it.questionEN, awnser: it.awnserEN};

        if (it.questionEN == "" && it.awnserEN == ""){

          duvida = {question: it.questionPT, awnser: it.awnserPT }
        }   
        setDuvidas((prev) => [duvida, ...prev]);
      });
    }
 }

  return (
    <div>
      <div className="grid grid-flow-col grid-cols-2 ">
        <div className="col-start-3 p-2 me-4">{<SelectLanguage changeLanguage={onChangeLanguage} />}</div>
      </div>
      <div className="flex flex-row sm:justify-start lg:justify-center mt-12">
        <div className=" rounded-lg container mx-auto">

          {duvidas.map((item, _index)=> 
            <Duvida question={item.question} answer={item.awnser}/>
          )}

        </div>
      </div>
    </div>
  );
};

export default PerguntasFrequentes;
