import { useNavigate } from "react-router-dom";

interface CardProps {
  id: string;
  title: string;
  date: string;
  conteudo: string;
}

const ForumCard = ({ id, title, date, conteudo }: CardProps) => {
  const navigate = useNavigate();

  function redirectPage() {
    navigate(`/topico/${id}`);
  }

  return (
    <div
      className="
        group cursor-pointer
        rounded-2xl border border-slate-200 dark:border-slate-700
        p-5 shadow-sm
        transition-all duration-300
        hover:shadow-xl hover:border-blue-400 hover:bg-blue-50/30
        relative overflow-hidden
      dark:bg-slate-900 dark:text-slate-50 bg-slate-50  text-slate-900"
      onClick={redirectPage}

    >


      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200">
            {"Discussão"}
          </span>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-900 bg-slate-100 dark:bg-slate-200 px-2 py-0.5 rounded">
            {date}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-50 leading-tight  transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-100 line-clamp-2 leading-relaxed font-normal">
            {conteudo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForumCard;

