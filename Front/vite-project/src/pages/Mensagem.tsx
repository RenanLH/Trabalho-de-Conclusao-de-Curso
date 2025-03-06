import { useParams } from "react-router-dom";
import Topico from "../components/Topico";
import axios from "axios";
import { useEffect, useState } from "react";
import Responder from "../components/Responder";
import SelectLanguage from "../components/SelectLanguage";
import Resposta from "../components/Resposta";

type MensagemParams = {
  id: string;
};

type tTopico = {
  id: string;
  title: string;
  user: string;
  text: string;
};

type tResposta = {
  id: string;
  user: string;
  text: string;
};

const Mensagem = () => {
  let {id} = useParams<MensagemParams>();
  id = id as string;

  useEffect(() => {
    getMensagem();
  },[]);

  const [topico, setTopico] = useState<tTopico>({id:"",title:"",user:"",text:""});
  const [respostas, setRespostas] = useState<tResposta[]>([]);

  async function getMensagem(){
    const url = "http://localhost:9875/mensagens/id/" + id;
    setTopico({id:"",title:"",user:"",text:""});
    setRespostas([]);

    const result = await axios.get(url);

    if (result.status == 200){
      const mensagem = result.data;
      setTopico({id:mensagem._id, title:"", user: mensagem.nomeUsuario, text:mensagem.conteudoMensagem});
      setRespostas((prev) => [...prev, {id:"", user:"renan", text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum  "}])
    }

  }

  return (
    <div>
      <div className="flex justify-end mr-7 p-1 mt-1">
          <SelectLanguage changeLanguage={() => {}} />
      </div>  

      <div className="flex flex-col">
        <Topico title={""} user={topico.user} text={topico.text} />
        {respostas.length && respostas.map((item, _index) => (
          <Resposta user={item.user} text={item.text}/>
        ))}
      {true && <Responder></Responder>}
      </div>    
     
    </div>
  );
};

export default Mensagem;
