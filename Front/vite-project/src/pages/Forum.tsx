import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../util/config";
import axios from "axios";
import ForumCard from "../components/ForumCard";
import logo_mensagem from "../assets/message-circle-lines-svgrepo-com.svg";
import { isAdmin } from "../util/util";

type TopicDB = {
  _id: string;
  idUsuario: string,
  titulo: string,
  conteudo: string,
  dataCriacao: string,
};

const Forum = () => {
  const { t, i18n } = useTranslation();
  const [topics, setTopics] = useState<TopicDB[]>([]);


  useEffect(() => {
    let theme = sessionStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }

    let language = sessionStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);
    }

    getTopics();

  }, []);

  function formatDate(date: string) {
    const dataF = new Date(date);

    const dia = dataF.getDate() < 10 ? "0" + dataF.getDate() : dataF.getDate();
    const mes = dataF.getMonth() < 10 ? "0" + (dataF.getMonth() + 1) : (dataF.getMonth() + 1); // getMonth começa em 0 :)

    return `${dia}/${mes}/${dataF.getFullYear()}`;
  }


  function onClickTopico() {
    window.location.href = "/forum/novo";
  }

  async function getTopics() {
    const url = `${API_BASE_URL}/forum`
    setTopics([]);

    const result = await axios.get(url);

    if (result.status == 200) {
      setTopics(result.data as TopicDB[]);
    }
  }

  return (
    <div className="bg-gray-100 dark:bg-slate-800/80 min-h-screen">
      <div>
        <Header texto={t("Forum")} />
      </div>

      <div className="flex flex-row">
        <ul className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
          {topics.map((item, _index) => (
            <li className="list-item p-4" key={item._id}>
              <ForumCard id={item._id} title={item.titulo} conteudo={item.conteudo} date={formatDate(item.dataCriacao)} />
            </li>
          ))}
        </ul>
      </div>
      {
        isAdmin() &&
        <div className="fixed bottom-44 right-4">
          <img className="size-20 cursor-pointer" src={logo_mensagem} alt="Nova Mensagem" onClick={onClickTopico} />
        </div>
      }


    </div>
  );
};

export default Forum;
