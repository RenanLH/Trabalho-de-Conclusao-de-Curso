import Duvida from "./Duvida";
import axios from "axios";
import { useState, useEffect } from "react";

type QuestionDB = {
  pergunta: string,
  resposta: string,
};

const ListDuvida = () => {

  const [duvidas, setDuvidas] = useState<JSX.Element[]>([])

  useEffect(() => {
    getQuestions()
  },[]);


  async function getQuestions(){
    const url = "http://localhost:9875/api/pergunta";

    setDuvidas([]);

    const result = await axios.get(url);

    if (result.status == 200){
      const resultArray = result.data as QuestionDB[];
      
      resultArray.map((it) => {
        const element =  <Duvida question={it.pergunta} answer={it.resposta}/>
        setDuvidas((prev) => [element, ...prev]);
      });

    }
    
  }

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
