import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../util/util";

interface MensagemCardProps {
  id: string;
  title: string;
  userName: string;
  userId: string;
  date: string;
  conteudo: string
}

const MensagemCard = ({ id, title, userName, userId, date, conteudo }: MensagemCardProps) => {
  const navigate = useNavigate();
  let idUsuario = localStorage.getItem("idUsuario");

  function redirectPage() {
    navigate(`/mensagem/${id}`);
  }

  return (
    <div
      onClick={redirectPage}
      className="
        group cursor-pointer
        rounded-xl border border-slate-200 dark:border-slate-700
        p-5 shadow-sm
        transition-all duration-300
      hover:border-blue-400 hover:shadow-md hover:bg-slate-50/50
        relative overflow-hidden
      dark:bg-slate-900 dark:text-slate-50 bg-slate-50 text-slate-900">

      <div className="flex items-center justify-between mb-3 ">

        <div className="flex items-center gap-2">

          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-300">
            {(idUsuario && idUsuario != userId) ? "Mensagem Recebida" : "Mensagem Enviada"}
          </span>
        
        </div>

        <span className="text-[11px] font-medium text-slate-400 dark:text-slate-900 bg-slate-100 dark:bg-slate-200 px-2 py-0.5 rounded notranslate">
          {formatDate(date)}
        </span>
      </div>

      <div className="mb-2 flex gap-2 notranslate">
        <span className="text-xs text-slate-500 dark:text-slate-300 block mb-0.5">{t("Mensagem_Remetente")}:</span>
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-50">
          {userName}
        </h4>
      </div>

      <div className="pt-2 border-t border-slate-700 dark:border-slate-50 min-w-0 w-full">
        <span className="text-xs text-slate-500 dark:text-slate-300 block mb-0.5">Assunto:</span>
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 leading-snug line-clamp-2 [overflow-wrap:anywhere]">
          {title}
        </h3>
      </div>

      <p className="mt-3 text-sm text-slate-500 dark:text-slate-300 line-clamp-2 font-normal leading-relaxed break-words">
        {conteudo || "Clique para abrir a mensagem completa e visualizar os detalhes..."}
      </p>

    </div>
  );
};

export default MensagemCard;
