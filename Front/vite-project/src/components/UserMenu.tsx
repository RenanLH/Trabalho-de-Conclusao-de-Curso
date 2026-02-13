import React, { useEffect, useState } from 'react';
import { Moon, LogOut, Settings } from 'lucide-react';
import logo_login from "../assets/user-circle-svgrepo-com.svg"
import { useTranslation } from 'react-i18next';



interface UserMenuProps {
  onLogout: () => void;
  onNavigate: (path: string) => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
  showComponent: (b: boolean) => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ showComponent, onLogout, onNavigate, toggleTheme, isDarkMode }) => {

  const { t } = useTranslation();
  const [nomeUsuario, setNomeUsuario] = useState<string>("");

  useEffect(() => {
    const nome = sessionStorage.getItem("nomeUsuario");
    if (nome) {
      setNomeUsuario(nome);
    }
  }, [])

  return (
    <div className="w-72  rounded-md shadow-xl border py-2 overflow-hidden bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50">

      <div onClick={() => onNavigate('/profile')}
        className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors group hover:bg-slate-200 dark:hover:bg-slate-800">

        <div className="relative">
          <div className="w-8 h-8  rounded-full flex items-center justify-center overflow-hidden">
            <img className="h-8 md:h-10 dark:invert" src={logo_login} alt="Logout" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{t("Conta")}</span>
          <span className="text-xs text-[#818384]">{nomeUsuario}</span>
        </div>
      </div>


      <div className="flex flex-col">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-between px-4 py-2.5  transition-colors w-full text-left hover:bg-slate-200 dark:hover:bg-slate-800">
          <div className="flex items-center gap-3">
            <Moon size={20} color={isDarkMode ? "white" : "black"} />
            <span className="text-sm">{t("Tema")}</span>
          </div>
          <div className={`w-8 h-4 rounded-full relative transition-colors ${isDarkMode ? 'bg-blue-500' : 'bg-slate-900'}`} >
            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${isDarkMode ? 'right-0.5' : 'left-0.5'}`} />
          </div>
        </button>

      </div>

      <hr className="border-[#343536] my-1" />

      <div className="flex flex-col ">
        <button className="flex items-center justify-between px-4 py-2.5  transition-colors w-full text-left group hover:bg-slate-200 dark:hover:bg-slate-800">
          <div className="flex items-center gap-3 ">
            <span className="text-black dark:text-white">{<Settings size={20} color={isDarkMode ? "white" : "black"} />}</span>
            <div className="flex flex-col">
              <span className="text-sm">{t("Settings")}</span>
            </div>
          </div>
        </button>

        <button className="flex items-center justify-between px-4 py-2.5  transition-colors w-full text-left group hover:bg-slate-200 dark:hover:bg-slate-800" onClick={onLogout}>
          <div className="flex items-center gap-3 ">
            <span className="text-black dark:text-white">{<LogOut size={20} color={isDarkMode ? "white" : "black"} />}</span>
            <div className="flex flex-col">
              <span className="text-sm">{t("Sair")}</span>
            </div>
          </div>
        </button>

      </div>
    </div>
  );


};


export default UserMenu;