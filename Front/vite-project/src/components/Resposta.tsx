import { FormEvent, useEffect, useState } from "react";
import Responder from "./Responder";
import { API_BASE_URL } from "../util/config";
import axios from "axios";
import { useTranslation } from "react-i18next";
import UserBadge from "./UserBadge";
import UserInfo from "./UserInfo";

interface RespostaProps {
  id: string;
  idTopico: string;
  nomeUsuario: string;
  conteudoMensagem: string;
  idResposta: string;
  dataCriacao: string;
  nivel: number;
}

type bdResposta = {
  _id: string;
  idUsuario: string;
  idResposta: string;
  idTopico: string;
  nomeUsuario: string;
  conteudoResposta: string;
  dataEnvio: string;
}

const Resposta = ({ id, idTopico, dataCriacao, conteudoMensagem, nomeUsuario, nivel }: RespostaProps) => {

  const [conteudoResposta, setConteudoResposta] = useState<string>("");
  const [respostas, setRespostas] = useState<bdResposta[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false)
  const [responder, setResponder] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (!loaded)
      getRespostas();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem("token") || "";
    let idUsuario = localStorage.getItem("idUsuario") || "";

    if (!token) {
      window.location.href = "/login";
    }

    let url = `${API_BASE_URL}/respostas/responder/` + id;

    const resultCreate = await axios.post(url, {
      idUsuario: idUsuario,
      token: token,
      idResposta: id,
      conteudoResposta: conteudoResposta
    });

    if (resultCreate.status == 200) {
      const respostaBd = resultCreate.data as bdResposta;
      console.log("Mensagem criada com sucesso");
      setResponder(!responder);
      setConteudoResposta("");

      setRespostas((prev) => [...prev, {
        _id: respostaBd._id,
        idUsuario: respostaBd.idUsuario,
        idResposta: respostaBd.idResposta,
        idTopico: respostaBd.idTopico,
        nomeUsuario: respostaBd.nomeUsuario,
        conteudoResposta: respostaBd.conteudoResposta,
        dataEnvio: respostaBd.dataEnvio
      }])
    }

  }


  async function getRespostas() {

    if (nivel > 2) {
      return;
    }

    const url = `${API_BASE_URL}/respostas/` + id;

    const result = await axios.get(url);

    if (result.status == 200) {
      const respostasBd = result.data as bdResposta[];
      setLoaded(true);
      console.log(url, respostasBd);
      respostasBd.forEach((item) => {
        setRespostas((prev) => [...prev,
        {
          _id: item._id,
          idUsuario: item.idUsuario,
          idResposta: item.idResposta,
          idTopico: item.idTopico,
          nomeUsuario: item.nomeUsuario,
          conteudoResposta: item.conteudoResposta,
          dataEnvio: item.dataEnvio
        }]);
      })
    }
  }


  return (
    <div className={`group/${id} flex mr-3 ml-3 mt-2 border border-slate-200  
      rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 overflow-hidden
    `}>

      <div className={`shrink-0 w-2 bg-blue-200 dark:bg-blue-500 group-hover/${id}:bg-blue-500 transition-colors`} onClick={() => setActiveIndex(!activeIndex)} />

      <div className="p-4 pb-4 w-full dark:bg-slate-900 dark:text-slate-50 bg-slate-50 text-slate-900">

        <div className="flex items-center gap-2 mb-3 " onClick={() => setActiveIndex(!activeIndex)}>
          <UserBadge user={nomeUsuario} />
          <UserInfo user={nomeUsuario} isAdmin={false} date={dataCriacao} />
        </div>


        <span className="text-slate-600 dark:text-slate-50 leading-relaxed text-sm md:text-base line-clamp-10 mb-4 break-words ">
          {conteudoMensagem}
        </span>

        <div className="flex items-center gap-4 pt-4 border-t border-slate-200 notranslate">

          <button className="flex items-center gap-1.5 text-slate-500 dark:text-slate-50 hover:text-blue-600 text-xs font-semibold transition-colors" onClick={() => setResponder(!responder)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            {t("Responder")}
          </button>
        </div>
        <div className={`
            flex transition-all duration-300 ease-in-out
            ${responder
            ? "opacity-100 translate-y-0 max-h-96 mt-3"
            : "opacity-0 -translate-y-2 max-h-0 overflow-hidden pointer-events-none"}
          `}>
          <Responder conteudoResposta={conteudoResposta} onChangeResposta={setConteudoResposta} onSubmit={onSubmit} textoBotao={"Comentar"} />
        </div>
        <div>

          <div className={`
              grid transition-all duration-300 ease-in-out
              ${!activeIndex && respostas ? "grid-rows-[1fr] opacity-100 " : "grid-rows-[0fr] opacity-0"}
            `}>

            <div className="overflow-hidden">
              {
                respostas.map((item, _index) => (
                  <div className="mt-4 mb-4  w-full ">
                    <Resposta id={item._id} idTopico={idTopico} nomeUsuario={item.nomeUsuario}
                      conteudoMensagem={item.conteudoResposta} idResposta={item._id}
                      nivel={nivel + 1} dataCriacao={item.dataEnvio} />
                  </div>
                ))
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Resposta;
