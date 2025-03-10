import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import MensageCard from "./MensageCard";

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
  const { t } = useTranslation();

  useEffect(() => {
    getMensagens()
  },[]);
  

  async function getMensagens() {
    const url = true? "http://localhost:9875/mensagens/index/NR": "http://localhost:9875/mensagens/usuario/"
    setMensagens([]);

    const result = await axios.get(url);

    if (result.status == 200){
      console.log(result.data);
        setMensagens(result.data as Mensagem[]);
    }
  }

  function formatDate(date: string){
    const dataF = new Date(date);

    const dia = dataF.getDay() < 10? "0" + dataF.getDay(): dataF.getDay();
    const mes = dataF.getMonth() < 10? "0" + dataF.getMonth(): dataF.getMonth();


    return `${dia}/${mes}/${dataF.getFullYear()}`;
  }
  
  return (
    <div>
      <ul className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
        {mensagens.map((item, _index) => (
          <li className="list-item p-4" key={item._id}>
            <MensageCard id={item._id} content={item.conteudoMensagem} user={item.nomeUsuario} data={formatDate(item.dataEnvio)}/>
          </li>
        ))}
      </ul>

      
    </div>
  );
};

export default ListMensagens;
