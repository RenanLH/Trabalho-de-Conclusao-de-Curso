import { FormEvent } from "react";
import CustomButton from "./CustomButton";

type ResponderParams = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  textoBotao: string;
  onChangeResposta: (respota: string) => void;
  conteudoResposta: string;
};

const responder = (param: ResponderParams) => {

  let { textoBotao, onSubmit, onChangeResposta, conteudoResposta } = param;

  return (
    <div className="flex w-full p-2 ml-3">
      <form
        action="submit"
        onSubmit={(e) => onSubmit(e)}
        className="flex-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-md overflow-hidden"
      >
        <div className="flex flex-col p-4 bg-slate-50 dark:bg-slate-900">
          <textarea className={`
          min-h-28 w-full p-3 
          text-slate-700 dark:text-slate-50 
          bg-slate-50 dark:bg-slate-800 
          border-2 border-slate-200 dark:border-slate-700 
          rounded-lg transition-all duration-200 outline-none resize-y 
          placeholder:text-slate-400 
          hover:border-slate-300 dark:hover:border-slate-500
          focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20
        `}
            value={conteudoResposta}
            onChange={(e) => onChangeResposta(e.target.value)}
            placeholder="Escreva sua resposta..."
            required
          />
        </div>

        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 dark:bg-slate-900  flex justify-end">
          <div className="">
            <CustomButton
              disabledFunction={() => conteudoResposta?.length < 2}
              buttonText={textoBotao}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default responder;