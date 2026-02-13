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
      setResposta(answer.replace(extractedLink as string, ""));
    } else
      setResposta(answer);

  };


  return (
    <div className="m-2 ">

      <div className={` group border transition-all duration-300 rounded-xl cursor-pointer  dark:bg-slate-900 dark:text-slate-50 bg-slate-50 text-slate-900
      ${activeIndex ? "bg-white border-blue-400 shadow-md" : "bg-slate-50 border-slate-200 dark:border-slate-700 hover:bg-slate-100"} `}>

        <div className="flex items-center justify-between p-4" onClick={onClickDiv} >
          <p className={`font-medium transition-colors "text-slate-700 dark:text-slate-50`}>
            {question}
          </p>
          <div className={` w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300
          ${activeIndex ? "bg-blue-600 text-white rotate-0" : "bg-white text-slate-400 rotate-180"} `}>
            <FontAwesomeIcon icon={faCircleArrowUp} />
          </div>
        </div>

        <div className={` transition-all duration-300 ease-in-out overflow-hidden ${activeIndex
          ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} `}>
          <div className="p-4 pt-0 border-t border-slate-200 dark:border-slate-700">
            <div className="mt-3 text-slate-900 dark:text-slate-50 text-sm leading-relaxed ">
              {link ?
                <div className="flex flex-col gap-2">
                  <span>{resposta}</span>
                  <a href={link} className="text-blue-500 hover:underline font-medium break-all" onClick={(e) =>
                    e.stopPropagation()}>
                    {link}
                  </a>
                </div>
                :
                <span className="text-slate-800 dark:text-slate-50">{resposta}</span>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Duvida;
