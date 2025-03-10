import { useState } from "react";
import { faAngleUp, faAngleDown, faCircleArrowDown, faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DuvidaProps {
  question: string;
  answer: string;
}

library.add(faAngleDown, faAngleUp, faCircleArrowUp, faCircleArrowDown);

const extractUrl = (data: String) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const match = data.match(urlRegex);
  return match ? match[0] : null;
};


const Duvida = ({ question, answer }: DuvidaProps) => {

  const [link, setLink] = useState("");
  const [resposta, setResposta] = useState("");

  const [activeIndex, setActiveIndex] = useState(false);

  const onClickDiv = () => {
    setActiveIndex(!activeIndex);
    
    const extractedLink = extractUrl(answer)

    if (extractedLink) {
      setLink(extractedLink);
      setResposta (answer.replace(extractedLink as string, ""));
    }else
      setResposta(answer); 
  
  };
  return (
    <div>
      <div className="bg-gray-300 m-2 p-2 border-1 rounded-lg cursor-pointer">
        <div className="grid grid-flow-col grid-cols-2" onClick={onClickDiv}>
          <p className="col-start-1 items-start">{question}</p>
          <div className="col-start-3 max-h-10 justify-end rounded-3xl p-2 bg-slate-50 mb-3">
            <FontAwesomeIcon icon={activeIndex ? faCircleArrowUp : faCircleArrowDown} />
          </div>
        </div>

        {activeIndex && (
          <div className="p-2 border-t rounded-lg bg-white">
            {link ? (<div className="flex flex-col gap-x-0 gap-y-0">
                <p>{resposta}</p>
                <a href={link}>{link}</a>
            </div> ) :<p>{resposta}</p> }

          </div>
        )}
      </div>
    </div>
  );
};

export default Duvida;
