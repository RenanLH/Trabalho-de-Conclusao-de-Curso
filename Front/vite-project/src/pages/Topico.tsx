import { useParams } from "react-router-dom";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Resposta from "../components/Resposta";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { API_BASE_URL } from "../util/config";
import Responder from "../components/Responder";
import Notification from "../components/Notification";
import { isLogged } from "../util/util";
import UserBadge from "../components/UserBadge";
import UserInfo from "../components/UserInfo";

type TopicParams = {
  id: string;
};

type tTopico = {
  id: string;
  idUsuario: string;
  titulo: string;
  conteudo: string;
  dataCriacao: string;
};

type tResposta = {
  id: string;
  user: string;
  text: string;
  data: string;
};

type bdResposta = {
  _id: string;
  idUsuario: string;
  idResposta: string;
  idTopico: string;
  nomeUsuario: string;
  conteudoResposta: string;
  dataEnvio: string;
}

const Topic = () => {

  const [topico, setTopico] = useState<tTopico>();
  const [respostas, setRespostas] = useState<tResposta[]>([]);
  const { i18n } = useTranslation();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [conteudoResposta, setConteudoResposta] = useState<string>("");
  const [notification, setNotification] = useState<boolean>(false);

  let { id } = useParams<TopicParams>();
  id = id as string;

  useEffect(() => {

    let theme = sessionStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }

    let language = sessionStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);
    }

    getTopic();

  }, []);

  async function getTopic() {

    if (!id || id.length < 24) {
      window.location.href = "/forum"
    }

    const url = `${API_BASE_URL}/forum/` + id;
    setRespostas([]);

    await axios.get(url).then((res) => {
      if (res.status == 200) {
        setTopico(res.data);
        getRespostas();
        setLoaded(true);
      }
    }).catch(function (error) {
      if (error.response) { window.location.href = "/forum"; }
    })
  }
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let idUsuario = sessionStorage.getItem("idUsuario") || "";

    if (!isLogged()) {
      setNotification(true);
      return;
    }

    let url = `${API_BASE_URL}/topico/respostas/` + id;

    const result = await axios.post(url, {
      idUsuario: idUsuario,
      idTopico: id,
      conteudoResposta: conteudoResposta
    });
    if (result.status == 200) {
      const respostaBD = result.data as bdResposta;
      console.log("Resposta enviada com sucesso");
      setRespostas((prev) => [...prev, { id: respostaBD._id, user: respostaBD.nomeUsuario, text: respostaBD.conteudoResposta, data: respostaBD.dataEnvio }]);
      setConteudoResposta("");
    }

  }

  async function getRespostas() {
    const url = `${API_BASE_URL}/topico/respostas/` + id;

    const result = await axios.get(url);

    if (result.status == 200) {
      const respostasBd = result.data as bdResposta[];
      console.log(url, respostasBd);
      respostasBd.forEach((item) => {
        setRespostas((prev) => [...prev, { id: item._id, user: item.nomeUsuario, text: item.conteudoResposta, data: item.dataEnvio }]);
      })
    }
  }

  return (
    <div className="bg-gray-100 dark:bg-slate-800/80 min-h-screen ">
      <Header texto={topico?.titulo} translate={true} />
      {
        loaded && topico ?
          <div>
            <Notification isOpen={notification} type={"error"} mensagem={"Por favor, faça login para continuar"} onCancel={() => setNotification(!notification)} onLogin={true} onConfirm={() => setNotification(!notification)} />

            <div className="group mr-4 ml-4 mt-2 bg-slate-50 border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm transition-all duration-300 overflow-hidden">
              <div className="flex">

                <div className="p-6 w-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">

                      <UserBadge user={topico.idUsuario} size={"w-10 h-10"} />

                      <UserInfo user={topico.idUsuario} isAdmin={false} date={topico.dataCriacao} />

                    </div>

                    <span className="hidden sm:block px-3 py-1 rounded-full  text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200">
                      Discussão
                    </span>
                  </div>


                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 dark:text-slate-50 leading-relaxed text-base md:text-lg font-normal whitespace-pre-line">
                      {topico.conteudo}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex mr-2 items-center">
              <Responder onChangeResposta={setConteudoResposta} onSubmit={onSubmit} conteudoResposta={conteudoResposta} textoBotao={"Comentar"} />
            </div>
            {
              respostas.map((item, _index) => (
                <Resposta id={item.id} idTopico={topico.id} nomeUsuario={item.user} conteudoMensagem={item.text} idResposta={""} nivel={1} dataCriacao={item.data} />
              ))
            }
          </div> : <div></div>
      }
    </div>
  );
};

export default Topic;
