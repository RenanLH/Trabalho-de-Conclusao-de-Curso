import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../util/config";
import axios from "axios";
import ForumCard from "../components/ForumCard";
import { isAdmin } from "../util/util";
import FloatingMenu from "../components/FloatingMenu";
import { useSearchParams } from "react-router-dom";

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
  const [loaded, setLoaded] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");


  useEffect(() => {
    let theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }

    let language = localStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);
    }

    getTopics();

  }, []);


  function onClickTopico() {
    window.location.href = "/forum/novo";
  }

  async function getTopics() {
    let url = `${API_BASE_URL}/forum`


    if (query){
      url = url + `/buscar/${query}`; 
    }

    await axios.get(url).then((res) => {
      if (res.status == 200) {
        setTopics(res.data as TopicDB[]);
      }

      setLoaded(true);
    }).catch(() => {
      setLoaded(true);
    });

  }

  return (
    <div className="bg-gray-100 dark:bg-slate-800/80 min-h-screen">
      <Header texto={t("Forum")} />

      {
        loaded && topics.length ?
          <div className="flex flex-row">
            <ul className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
              {
                topics.map((item, _index) => (
                  <li className="list-item p-4" key={item._id}>
                    <ForumCard id={item._id} title={item.titulo} conteudo={item.conteudo} date={item.dataCriacao} />
                  </li>
                ))
              }
            </ul>
          </div>
          :
          loaded &&
          <div>
            <h1 className=" p-4 text-slate-900 dark:text-white text-center text-4xl">Nenhum tópico encontrado.</h1>
          </div>
      }
      {
        isAdmin() &&
        <FloatingMenu onAdd={onClickTopico} onEdit={() => { }} onDelete={() => { }} showAdd={isAdmin()} showEdit={isAdmin()} showDelete={isAdmin()} />
      }
    </div>
  );
};

export default Forum;
