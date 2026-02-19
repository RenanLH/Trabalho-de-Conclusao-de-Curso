import { useParams } from "react-router-dom";
import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import Responder from "../components/Responder";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import { API_BASE_URL, BASE_URL } from "../util/config";
import Mensagem from "../components/Mesagem";
import { isAdmin, isLogged, statusMensagem } from "../util/util";
import Notification from "../components/CustomNotification";
import { io, Socket } from 'socket.io-client';
import FloatingMenu from "../components/FloatingMenu";
import { t } from "i18next";

type MensagemParams = {
  id: string;
};

type tMensagem = {
  _id: string;
  idUsuario: string;
  tituloMensagem: string;
  conteudoMensagem: string;
  statusMensagem: string;
  dataEnvio: string;
  nomeUsuario: string;

};

const MensagemPage = () => {
  let { id } = useParams<MensagemParams>();
  id = id as string;
  const { i18n } = useTranslation();
  const [mensagem, setMensagem] = useState<tMensagem>({ _id: "", idUsuario: "", conteudoMensagem: "", tituloMensagem: "", nomeUsuario: "", dataEnvio: "", statusMensagem: "" });
  const [loaded, setLoaded] = useState<boolean>(false);
  const [respostas, setRespostas] = useState<tMensagem[]>([]);
  const [conteudoMensagem, setConteudoMensagem] = useState<string>("")
  const [notification, setNotification] = useState<boolean>(false);
  const socketRef = useRef<Socket | null>(null);
  const [showAddTopic, setShowAddTopic] = useState<boolean>(false)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  useEffect(() => {

    let theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }

    if (!isLogged()) {
      window.location.href = "/login";
    }

    let language = localStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);
    }

    getMensagem();

    if (!socketRef.current) {
      socketRef.current = io(BASE_URL);
    }

    const socket = socketRef.current;

    socket.emit('join', id);

    socket.on('nova_mensagem', (data) => {
      setRespostas((prev) => [...prev, {
        _id: data._id, idUsuario: data.idUsuario,
        conteudoMensagem: data.conteudoMensagem, tituloMensagem: "", nomeUsuario: data.nomeUsuario,
        dataEnvio: data.dataEnvio, statusMensagem: data.statusMensagem
      }])
    });

    return () => {
      socket.off("nova_mensagem");
      socket.disconnect();
      socketRef.current = null;
    };

  }, [id]);


  const toggleSelection = (id: number) => {
    const newSelection = new Set(selectedIds);

    if (showAddTopic) {
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
    }
    setSelectedIds(newSelection);
  };


  const confirmAddTopic = () => {
    const respostasToAdd = respostas.filter((_, index) => selectedIds.has(index));
    setSelectedIds(new Set());

    if (!isAdmin()) {
      return;
    }

    sessionStorage.setItem('respostas_selecionadas', JSON.stringify(respostasToAdd));
    sessionStorage.setItem('titulo', mensagem.tituloMensagem);

    window.location.href = "/forum/novo";

  };



  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem("token") || "";
    let idUsuario = localStorage.getItem("idUsuario") || "";

    if (!isLogged()) {
      setNotification(true);
      return;
    }

    let url = `${API_BASE_URL}/mensagens/responder/`;

    await axios.post(url, {
      idUsuario: idUsuario,
      token: token,
      idMensagem: id,
      conteudoMensagem: conteudoMensagem
    }).then((res) => {
      if (res.status == 201) {
        setConteudoMensagem("");
      }
    });

  }

  async function getMensagem() {
    let url = `${API_BASE_URL}/mensagens/id/` + id;
    let token = localStorage.getItem("token");
    setRespostas([]);

    await axios.post(url, {
      token: token,
    })
      .then(function (res) {
        if (res.status == 200) {
          setLoaded(true);

          const mensagemBD: tMensagem = res.data;

          setMensagem(({
            _id: mensagemBD._id, idUsuario: mensagemBD.idUsuario, conteudoMensagem: mensagemBD.conteudoMensagem, tituloMensagem: mensagemBD.tituloMensagem,
            nomeUsuario: mensagemBD.nomeUsuario, dataEnvio: mensagemBD.dataEnvio, statusMensagem: mensagemBD.statusMensagem
          }));

          setRespostas((
            (prev) => [...prev, mensagemBD]
          ));


        }
      })
      .catch(function (error) {
        if (error.response) { window.location.href = "/mensagens"; }
      })

    url = `${API_BASE_URL}/mensagens/respostas/` + id;

    await axios.post(url, {
      token: token,
    }).then(function (result) {
      if (result.status == 200) {
        const respostas = result.data as tMensagem[];
        respostas.map((item, _index: number) => {
          setRespostas((prev) => [...prev, item]);
        });
      }
    });

  }

  function validateResposta() {
    return mensagem.statusMensagem != statusMensagem.F;
  }

  return (
    <div className="bg-gray-100 dark:bg-slate-800/80 min-h-screen">

      <Header texto={mensagem.tituloMensagem || t("Mensagem")} translate={true} />

      {loaded ?

        <div className="flex flex-col">
          {showAddTopic && (
            <div className=" mb-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-900 flex justify-between items-center animate-in fade-in slide-in-from-top-4">
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                {selectedIds.size} itens selecionados
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => { setShowAddTopic(false); setSelectedIds(new Set()) }}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  disabled={selectedIds.size === 0}
                  onClick={confirmAddTopic}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg shadow-lg  transition-all">
                  Incluir Selecionados
                </button>
              </div>
            </div>
          )}

          {
            isAdmin() &&
            <FloatingMenu onAdd={() => setShowAddTopic(true)} onEdit={() => { }} onDelete={() => { }} showAdd={isLogged()} showEdit={isAdmin()} showDelete={isAdmin()} />
          }


          <div className="flex mt-6 flex-col"> {/* Container pai garantindo largura total */}

            <ul className="w-full flex flex-col  px-4 md:px-0"> {/* Garante que a lista ocupe 100% */}
              {respostas.map((item, index) => (
                <li key={index} className="flex items-center gap-4 w-full group">

                  {/* Container do Checkbox - Tamanho fixo */}
                  {showAddTopic && (
                    <div className="flex-shrink-0 ml-4 animate-in zoom-in duration-300">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(index)}
                        onChange={() => toggleSelection(index)}
                        className="w-6 h-6 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-all"
                      />
                    </div>
                  )}

                  <div className="flex-1 w-full min-w-0">
                    <Mensagem
                      user={item.nomeUsuario}
                      status={item.statusMensagem}
                      text={item.conteudoMensagem}
                      date={item.dataEnvio}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>


          {validateResposta() &&
            <div className="flex ml-3 mr-2">
              <Responder onChangeResposta={setConteudoMensagem} onSubmit={onSubmit} conteudoResposta={conteudoMensagem} textoBotao={"Enviar a Mensagem"} />
            </div>
          }

          <Notification isOpen={notification} type={"error"} mensagem={"Erro: Usuário não cadastrado"} onCancel={() => setNotification(!notification)} onLogin={true} onConfirm={() => setNotification(!notification)} />

        </div>
        :
        <div>
          <h1 className="p-4 text-slate-900 dark:text-white text-center text-4xl ">Erro ao carregar a mensagem.</h1>
        </div>
      }

    </div>
  );
};

export default MensagemPage;
