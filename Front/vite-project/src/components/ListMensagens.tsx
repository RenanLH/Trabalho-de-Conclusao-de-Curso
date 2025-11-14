import axios from "axios";
import MensageCard from "./MensageCard";
import logo_mensagem from "../assets/message-circle-lines-svgrepo-com.svg";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../config";

type Mensagem = {
    _id: string,
    idUsuario: string,
    conteudoMensagem: string,
    statusMensagem: string,
    dataEnvio: string,
    nomeUsuario: string,
};

const ListMensagens = () => {

  const [mensagens, setMensagens] = useState<Mensagem[]> ([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    getMensagens()
  },[]);


  function onClickMensagem(){
    window.location.href = "/mensagem/nova";
  }
  

  async function getMensagens() {
    const idUsuario = sessionStorage.getItem("idUsuario");
    const url = `${API_BASE_URL}/mensagens/usuario/${idUsuario}`
    setMensagens([]);

    try{

      const result = await axios.get(url);
    
      if (result.status == 200){
        console.log(result.data);
          setMensagens(result.data as Mensagem[]);
      }
      setLoaded(true);
  

    }catch(e){
      console.log("Erro ao buscar mensagens");
      setLoaded(true);
    }
   
  }

  function formatDate(date: string){
    const dataF = new Date(date);

    const dia = dataF.getDay() < 10? "0" + dataF.getDay(): dataF.getDay();
    const mes = dataF.getMonth() < 10? "0" + dataF.getMonth(): dataF.getMonth();


    return `${dia}/${mes}/${dataF.getFullYear()}`;
  }
  
  return (
    <div className="w-full">
      {loaded && mensagens.length? 
      <div>
        <ul className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
          {mensagens.map((item, _index) => (
            <li className="list-item p-4" key={item._id}>
              <MensageCard id={item._id} content={item.conteudoMensagem} user={item.nomeUsuario} data={formatDate(item.dataEnvio)}/>
            </li>
          ))}

          </ul>
      </div>
      :

      <div>
        {loaded && 
        <div className="flex text-center items-center justify-center h-96 ">
          <h1>{t("NenumaMensagem")}</h1>
        </div>}

      </div>
      
    }

    
    <div className="fixed bottom-44 right-4">
      <img className="size-20 cursor-pointer" src={logo_mensagem} alt="Nova Mensagem" onClick={onClickMensagem} />
    </div>
    
      
    </div>
  );
};

export default ListMensagens;
