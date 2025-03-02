import Duvida from "./Duvida";
  import { useTranslation } from "react-i18next";
  import axios from "axios";
  import { useState, useEffect } from "react";


type Question = {
  questionPT: string,
  awnserPT: string,

  questionES: string,
  awnserES: string,

  questionEN: string,
  awnserEN: string,
};

const ListDuvida = () => {
  const { t } = useTranslation();

  const [duvidas, setDuvidas] = useState<JSX.Element[]>([])

  useEffect(() => {
    getQuestions()
  },[]);


  async function getQuestions(){
    const url = "http://localhost:7000/duvidas";

    setDuvidas([]);

    const result = await axios.get(url);

    if (result.status == 200){
      const resultArray = result.data as Question[];
      
      resultArray.map((it) => {
        const element =  <Duvida question={it.questionPT} answer={it.questionPT}/>
        setDuvidas((prev) => [element, ...prev]);
      });

    }
    
  }

   /*duvidas = [
    <Duvida question={t("Duvida1")} answer={t("Resposta1")} />,
    <Duvida question={t("Duvida2")} answer={t("Resposta2")} />,
    <Duvida question={t("Duvida3")} answer={t("Resposta3")} />,
    <Duvida question={t("Duvida4")} answer={t("Resposta4")} />,
    <Duvida question={t("Duvida5")} answer={t("Resposta5")} />,
    <Duvida question={t("Duvida6")} answer={t("Resposta6")} />,
  ];*/

  return (
    <div>
      <ul>
        {duvidas.map((item, index) => (
          <li className="list-item" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListDuvida;
