import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

type TopicDB = {
  idTopico: string,
  title: string,
  user: string,
  text: string,
};

const ListCard = () => {

  const [topics, setTopics] = useState<TopicDB[]> ([]);

  useEffect(() => {
    getTopics()
  },[]);
  

  async function getTopics() {
    const url = "http://localhost:9875/api/topicos"
    setTopics([]);

    const result = await axios.get(url);

    if (result.status == 200){
      setTopics(result.data as TopicDB[]);
    }
  }

  return (
    <div>
      <ul className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
        {topics.map((item, _index) => (
          <li className="list-item p-4" key={item.idTopico}>
            <Card id={item.idTopico} title={item.title} user={""}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCard;
