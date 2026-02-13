import React, { useState, FormEvent } from 'react';
import { API_BASE_URL } from '../util/config';
import axios from 'axios';
import CustomButton from './CustomButton';

interface FaqProps {
  showComponent: (value: boolean) => void;

}

const CriarNovaFaq: React.FC<FaqProps> = ({ showComponent }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function postQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const url = `${API_BASE_URL}/duvidas`;

    const result = await axios.post(url, {
      "pergunta": question,
      "resposta": answer
    });

    if (result.status == 201) {
      console.log(result.data);

      console.log("Pergunta cadastrada com sucesso");

      window.location.href = "/duvidas"

    } else {
      console.log("Erro ao efetuar cadastro");
    }

    setQuestion('');
    setAnswer('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 " >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => showComponent(false)}
      />

      <div className="relative w-full max-w-2xl dark:bg-slate-900 dark:text-slate-50 bg-slate-50 text-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between dark:bg-slate-700 bg-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-200 text-blue-600 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
            </div>
            <h2 id="modal-title" className="text-xl font-bold ">
              {("Nova Pergunta Frequente")}
            </h2>
          </div>
          <button onClick={() => showComponent(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <form onSubmit={postQuestion} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="question" className="text-sm font-semibold  ml-1">
              {("Qual é a pergunta frequente?")}
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full min-h-[80px] px-4 py-3 text-slate-700 dark:text-slate-50 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl resize-none "
              required
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="answer" className="text-sm font-semibold  ml-1">
              {("Resposta detalhada")}
            </label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full min-h-[160px] px-4 py-3 text-slate-700 dark:text-slate-50 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl resize-y "
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-50">
            <button
              type="button"
              onClick={() => showComponent(false)}
              className={`
                flex items-center gap-2 px-6 py-3 mb-4 text-sm font-bold text-white rounded-lg shadow-md notranslate
                transition-all duration-200 transform active:scale-95
                bg-slate-500 mt-4 hover:bg-slate-700 hover:shadow-slate-200/50 focus:ring-2 focus:ring-offset-2 focus:ring-slate-500'   
              `}            >
              {("Cancelar")}
            </button>
            <CustomButton
              disabledFunction={() => false}
              buttonText="Publicar FAQ"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CriarNovaFaq;