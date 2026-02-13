import { useParams } from "react-router-dom";
import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import Responder from "../components/Responder";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import { API_BASE_URL, BASE_URL } from "../util/config";
import Mensagem from "../components/Mesagem";
import { isLogged, statusMensagem } from "../util/util";
import Notification from "../components/Notification";
import { io, Socket } from 'socket.io-client';

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

    getMensagem();

    if (!socketRef.current) {
      socketRef.current = io(BASE_URL);
    }

    const socket = socketRef.current;

    socket.emit('join', id);

    socket.on('nova_mensagem', (data) => {
      console.log("NOVA MENSASAGEMME " + data);
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


  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = sessionStorage.getItem("token") || "";
    let idUsuario = sessionStorage.getItem("idUsuario") || "";

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
    let token = sessionStorage.getItem("token");
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

      <Header texto={mensagem.tituloMensagem} translate={true} />
      {loaded ?

        <div className="flex flex-col">
          <Mensagem user={mensagem.nomeUsuario} status={mensagem.statusMensagem} text={mensagem.conteudoMensagem} date={mensagem.dataEnvio} />
          {respostas.map((item, _index) => (
            <Mensagem user={item.nomeUsuario} status={item.statusMensagem} text={item.conteudoMensagem} date={item.dataEnvio} />
          ))}
          {validateResposta() &&
            <div className="flex">
              <Responder onChangeResposta={setConteudoMensagem} onSubmit={onSubmit} conteudoResposta={conteudoMensagem} textoBotao={"Enviar a Mensagem"} />
            </div>
          }

          <Notification isOpen={notification} type={"error"} mensagem={"Erro: Usuário não cadastrado"} onCancel={() => setNotification(!notification)} onLogin={true} onConfirm={() => setNotification(!notification)} />

        </div>
        :
        <div>
          <h1 className="text-center text-4xl">Erro ao carregar mensagem</h1>

        </div>
      }

    </div>
  );
};

export default MensagemPage;
