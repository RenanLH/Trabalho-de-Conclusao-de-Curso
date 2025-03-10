import { useParams } from "react-router-dom";
import Topico from "../components/Topico";
import axios from "axios";
import { useEffect, useState } from "react";
import Responder from "../components/Responder";
import Resposta from "../components/Resposta";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

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
  _id: string;
  idUsuario: string;
  idResposta: string;
  idMensagem: string;
  nomeUsuario: string;
  conteudoResposta: string;
  dataEnvio: string;
};

const Mensagem = () => {
  let {id} = useParams<MensagemParams>();
  id = id as string;

  useEffect(() => {
    getMensagem();
  },[]);

  const { t, i18n } = useTranslation();
  const [topico, setTopico] = useState<tTopico>({id:"",title:"",user:"",text:""});
  const [idUsuario, setIdUsuario] = useState<string>("");
  const [idMessage, setIdMessage] = useState<string>("");
  const [idResposta, setIdResposta] = useState<string|undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [respostas, setRespostas] = useState<tResposta[]>([]);

  async function getMensagem(){
    let url = "http://localhost:9875/mensagens/id/" + id;
    setRespostas([]);

    let result = await axios.get(url);

    if (result.status == 200){
      setLoaded(true);
      
      const mensagem = result.data;

      setIdUsuario(mensagem.idUsuario);
      setIdMessage(mensagem._id);
      setTopico({id:mensagem._id, title:"", user: mensagem.nomeUsuario, text:mensagem.conteudoMensagem});
  
      url = "http://localhost:9875/respostas/mensagem/" + id;
      result = await axios.get(url);

      if (result.status == 200){
        const respostas = result.data as tResposta[];
        respostas.map((item, _index: number) => {
          setRespostas((prev) => [...prev, item]);
          setIdResposta(item.idResposta);
        });
      }
    }
  }

  //todo compare idUsuario with loggedUser
  function validateResposta(){
    return true;//(idUsuario == "");
  }

  return (
    <div>
      
      <Header texto={t("Mensagem")} changeLanguage={(e:string) => {i18n.changeLanguage(e)}}/>

    {loaded ? 
      <div className="flex flex-col">
        <Topico title={""} user={topico.user} text={topico.text} />
        {respostas.map((item, _index) => (
          <Resposta user={item.nomeUsuario} text={item.conteudoResposta}/>
        ))}
        {validateResposta() && <Responder idMensagem={idMessage} idResposta={idResposta} idUsuario={idUsuario}/>}	
      </div>  
    : <div></div>
    }
    <footer className="bg-blue-700 text-white p-4 position-absolute bottom-0 w-full">
    </footer>
    </div>
  );
};

export default Mensagem;
