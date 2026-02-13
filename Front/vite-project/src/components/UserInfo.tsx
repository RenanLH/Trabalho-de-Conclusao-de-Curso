import { formatDate } from "../util/util";

interface UserInfoProps {
  user: string;
  date: string;
  isAdmin: boolean;
}

const UserInfo = ({ user, date, isAdmin }: UserInfoProps) => {
  return (
    <div className="flex flex-col">

      <div className="flex flex-row gap-2">
        <span className="text-sm font-bold text-slate-800 dark:text-slate-50 hover:underline cursor-pointer notranslate">
          {user}
        </span>
        <span>
          {isAdmin &&
            <span className="flex sm:block px-3 py-1 rounded-full  text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-200/90 text-blue-700 border dark:text-blue-800 border-blue-200">
              Admin
            </span>
          }
        </span>
      </div>

      <span className="text-[11px] text-slate-500 dark:text-slate-300 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
        {formatDate(date)}
      </span>
    </div>
  );
};

export default UserInfo;