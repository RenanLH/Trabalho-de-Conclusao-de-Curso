import { useTranslation } from "react-i18next";
import Duvida from "../components/Duvida";
import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect, FormEvent } from "react";
import logo_mensagem from "../assets/add-svgrepo-com.svg";
import { API_BASE_URL } from "../config";

type QaADB = {
  _id: string,
  pergunta: string,
  resposta: string,
};

type QaA = {
  question: string,
  awnser: string,
};


const PerguntasFrequentes = () => {
  const { t, i18n } = useTranslation();
  const [duvidas, setDuvidas] = useState<QaA[]>([])
  const [showNewFaq, setShowNewFaq] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  

  useEffect(() => { 
    let language = sessionStorage.getItem("language");
    if (!language) 
      language = "pt";
    i18n.changeLanguage(language);

    getQuestions();

  },[]);


  function onClickPergunta(){
    setShowNewFaq(true);
  }

  async function getQuestions(){
    const url = `${API_BASE_URL}/duvidas`;

    setDuvidas([]);

    const result = await axios.get(url);

    if (result.status == 200 || result.status == 304 ){
      const resultArray = result.data as QaADB[];
      console.log(resultArray.length);
      
      resultArray.map((it, _index) => {
        const duvida = {question: it.pergunta, awnser: it.resposta};

        setDuvidas((prev) => [duvida, ...prev]);
      });

    }
  }

  async function postQuestion (event: FormEvent<HTMLFormElement>)  {
      event.preventDefault();
      
     const url = `${API_BASE_URL}/duvidas`;

      const result = await axios.post(url, {
        "pergunta":question,
        "resposta":answer
      });

      if (result.status == 201) {
        console.log(result.data);
        
        console.log("Pergunta cadastrada com sucesso");
        
        window.location.href = "/home"
  
      } else {
        console.log("Erro ao efetuar cadastro");
      }

  
      setShowNewFaq(false);
  
      setQuestion('');
      setAnswer('');
    };


  const handleCancel = () => {
    setShowNewFaq(false);

    setQuestion('');
    setAnswer('');
  };

  return (
    <div>
      <body className="min-h-screen">
        <Header texto={t("Perguntas_Frequentes")} changeLanguage={(e:string) => {i18n.changeLanguage(e);}}/>

        <div className="flex flex-row sm:justify-start lg:justify-center mt-12">
          <div className=" rounded-lg container mx-auto">

            {duvidas.map((item, index)=> 
              <Duvida question={item.question} answer={item.awnser} key={index}/>
            )}
          

          {sessionStorage.getItem("token") != undefined &&
          
            <div className="fixed bottom-44 right-4">
                <img className="size-20 cursor-pointer" src={logo_mensagem} alt="Nova Pergunta" onClick={onClickPergunta} />
            </div>
              
          }
          
          </div>


        {showNewFaq && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
          <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-xl">
            <form onSubmit={postQuestion} className="space-y-4">
              <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
                {t("Nova Pergunta Frequente")}
              </h2>

              <div>
                <label
                  htmlFor="question"
                  className="block text-sm font-medium text-gray-700">
                  {t("Pergunta")}
                </label>
                <textarea
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="answer"
                  className="block text-sm font-medium text-gray-700">
                  {t("Resposta")}
                </label>
                <textarea
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  {t("Cancelar")}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  
                >
                {t("Enviar Pergunta")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        </div>
      </body>
      
    </div>
  );
};

export default PerguntasFrequentes;
