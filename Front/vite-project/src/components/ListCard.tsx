import { useEffect, useState } from "react";
import Card from "./Card";
import { useTranslation } from "react-i18next";
import axios from "axios";

type TopicDB = {
  idTopico: string,
  title: string,
  user: string,
  text: string,
};

const ListCard = () => {

  const [topics, setTopics] = useState<TopicDB[]> ([]);
  const { t } = useTranslation();

  useEffect(() => {
    getTopics()
  },[]);
  

  async function getTopics() {
    const url = "http://localhost:7000/topicos"
    setTopics([]);

    const result = await axios.get(url);

    if (result.status == 200){
      setTopics(result.data as TopicDB[]);
    }
  }
  /*

  const list = [
    <Card
      title={t("ForumTitulo1")}
      user={t("ForumUsuario")}
      text={t("ForumTexto1")}
    />,
    <Card
      title={t("ForumTitulo2")}
      user={t("ForumUsuario")}
      text={t("ForumTexto2")}
    />,
    <Card
      title={t("ForumTitulo3")}
      user={t("ForumUsuario")}
      text={t("ForumTexto3")}
    />,
    <Card
      title={t("ForumTitulo4")}
      user={t("ForumUsuario")}
      text={t("ForumTexto4")}
    />,
    <Card
      title={t("ForumTitulo5")}
      user={t("ForumUsuario")}
      text={t("ForumTexto5")}
    />,
    <Card
      title={t("ForumTitulo6")}
      user={t("ForumUsuario")}
      text={t("ForumTexto6")}
    />,
  ];
*/
  return (
    <div>
      <ul className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
        {topics.map((item, _index) => (
          <li className="list-item p-4">
            <Card id={item.idTopico} title={item.title} user={item.user}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCard;
