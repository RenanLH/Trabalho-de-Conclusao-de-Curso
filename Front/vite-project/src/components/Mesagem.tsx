import { role } from "../util/util";
import UserBadge from "./UserBadge";
import UserInfo from "./UserInfo";

interface MensagemProps {
  user: string;
  text: string;
  date: string;
  status: string;
}

const Mensagem = ({ user, text, date, status }: MensagemProps) => {
  return (
    
    <div className="group ml-5 mr-5 mt-2 dark:bg-slate-900 bg-slate-50 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm ">
      
      <div className="flex">
        <div className="p-5 w-full">
          <div className="flex items-center gap-2 mb-3 ">
            <UserBadge user={user} />
            <UserInfo user={user} isAdmin={status == role.ADMIN} date={date}/>
          </div>
            <span className="text-slate-700 dark:text-slate-50 leading-relaxed text-base md:text-lg font-normal whitespace-pre-line break-before-auto">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default Mensagem;
