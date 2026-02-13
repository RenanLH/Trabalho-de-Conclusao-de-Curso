import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Header from "../components/Header";
import MensagemCard from "../components/MensagemCard";
import logo_mensagem from "../assets/message-circle-lines-svgrepo-com.svg";
import { API_BASE_URL } from "../util/config";
import { formatDate, isLogged } from "../util/util";

type MensagemType = {
  _id: string,
  idUsuario: string,
  conteudoMensagem: string,
  tituloMensagem: string,
  statusMensagem: string,
  dataEnvio: string,
  nomeUsuario: string,
};

const Mensagens = () => {
  const { t, i18n } = useTranslation();
  const [mensagens, setMensagens] = useState<MensagemType[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    let theme = sessionStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }

    if (!isLogged()) {
      window.location.href = "/login";
    }

    let language = sessionStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);
    }

    getMensagens();

  }, []);


  function onClickMensagem() {
    window.location.href = "/mensagem/nova";
  }

  async function getMensagens() {
    const idUsuario = sessionStorage.getItem("idUsuario");
    const url = `${API_BASE_URL}/mensagens/usuario/${idUsuario}`
    setMensagens([]);

    try {

      const result = await axios.get(url);

      if (result.status == 200) {
        console.log(result.data);
        setMensagens(result.data as MensagemType[]);
      }
      setLoaded(true);

    } catch (e) {
      console.log("Erro ao buscar mensagens");
      setLoaded(true);
    }
  }

  return (
    <div className="bg-gray-100 dark:bg-slate-800/80 min-h-screen flex flex-col">
      <Header texto={t("Minhas Mensagens")} />

      {loaded && mensagens.length ?
        <div>
          <ul className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
            {mensagens.map((item, _index) => (
              <li className="list-item p-4" key={item._id}>
                <MensagemCard id={item._id} title={item.tituloMensagem} conteudo={item.conteudoMensagem} userId={item.idUsuario} userName={item.nomeUsuario} date={formatDate(item.dataEnvio)} />
              </li>
            ))}

          </ul>
        </div>
        :
        <div>
          {loaded &&
            <div className=" inset-0 z-[100] flex items-center justify-center p-4  dark:text-white">
              <h1 className="text-center text-4xl">{t("NenhumaMensagem")}</h1>
            </div>}

        </div>

      }

      {
        isLogged() &&
        <div className="fixed bottom-44 right-4">
          <img className="size-20 cursor-pointer" src={logo_mensagem} alt="Nova Mensagem" onClick={onClickMensagem} />
        </div>
      }

    </div>
  );
};

export default Mensagens;