import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Header from "../components/Header";
import MensagemCard from "../components/MensagemCard";
import { API_BASE_URL } from "../util/config";
import { isAdmin, isLogged } from "../util/util";
import FloatingMenu from "../components/FloatingMenu";
import { MessageCircleMore, MessageCirclePlus } from "lucide-react";

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
        <div className="flex flex-row">
          <ul className="grid w-full sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">            {mensagens.map((item, _index) => (
            <li className="list-item container mx-auto p-4" key={item._id}>
              <MensagemCard id={item._id} title={item.tituloMensagem} conteudo={item.conteudoMensagem} userId={item.idUsuario} userName={item.nomeUsuario} date={item.dataEnvio} />
            </li>
          ))}

          </ul>
        </div>
        :
        <div>
          {loaded &&
            <div >
              <h1 className="p-4 text-slate-900 dark:text-white text-center text-4xl">{t("NenhumaMensagem")}</h1>
            </div>}

        </div>
      }
      {
        isLogged() &&
        <FloatingMenu mainIcon={MessageCircleMore} addIcon={MessageCirclePlus}
          onAdd={onClickMensagem} onEdit={() => { }} onDelete={() => { }}
          showAdd={isLogged()} showEdit={isAdmin()} showDelete={isAdmin()} />
      }

    </div>
  );
};

export default Mensagens;