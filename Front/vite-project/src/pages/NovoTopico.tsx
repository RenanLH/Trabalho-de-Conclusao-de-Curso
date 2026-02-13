import Header from "../components/Header";
import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../util/config";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import { isAdmin, isLogged } from "../util/util";
import Notification from "../components/Notification";

const NovoTopico = () => {

  const { t, i18n } = useTranslation();
  const [titulo, setTitulo] = useState<string>("");
  const [conteudo, setConteudo] = useState<string>("");
  const [notification, setNotification] = useState<boolean>(false);
  const [notifType, setNotifType] = useState<'success' | 'error'>('error')
  const [notifTy, setNotifTpe] = useState<() => void>()
  const maxLength = 100;
  const minLength = 10;
  const charCount = titulo.length;
  const isTooShort = charCount > 0 && charCount < minLength;
  const isTooLong = charCount > 0 && charCount > maxLength;

  useEffect(() => {

    let theme = sessionStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }

    if (!isLogged()) {
      window.location.href = "/login";
    }
    if (!isAdmin()) {
      window.location.href = "/forum";
    }

    let language = sessionStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);
    }
  }, []);

  const disableButton = () => {
    return conteudo.trim().length < 10 || titulo.trim().length < 10;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isAdmin()) {
      setNotification(true);
      setNotifTpe(() => { window.location.href = "/forum" })
      return;
    }

    let url = `${API_BASE_URL}/forum`;

    if (titulo.trim().length > 15) {
      const idUsuario = sessionStorage.getItem("idUsuario")
      const token = sessionStorage.getItem("token");
      if (!idUsuario || !token) {
        setNotification(true);
        return;
      }

      await axios.post(url, {
        idUsuario: idUsuario,
        titulo: titulo,
        conteudo: conteudo
      }).then((res) => {
        if (res.status == 201) {
          setNotifType('success');
          setNotifTpe(() => { })
          setNotification(true);

        }

      }).catch((error) => {
        if (error.response) {
          setNotification(true);
        }
      });

    }
  }


  return (
    <div>
      <div>
        <Header texto={t("NovoTopico")} />
      </div>
      <div className="bg-gray-100 dark:bg-slate-800/80 min-h-screen p-10 ">

        <div className=" max-w-full dark:bg-slate-900 dark:text-slate-50 bg-slate-50 text-slate-900 p-6 rounded-xl border text-center dark:border-slate-700 border-slate-200 shadow-sm">
          <div className="mb-4">
            <label htmlFor={"titulo"} className=" text-lg font-bold items-center gap-2">
              {t("Titulo do Tópico")}
            </label>
          </div>

          <div className="flex">
            <input
              id={"titulo"}
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder=""
              className="bg-slate-50 dark:bg-slate-600 text-slate-900 dark:text-slate-50
              w-full px-4 py-3 text-lg font-medium rounded-lg border-2 outline-slate-700 "
            />
          </div>

          <div className="mt-2 min-h-[20px]">
            {isTooShort && (
              <p className="text-amber-600 text-xs flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                O título está muito curto (mínimo {minLength} caracteres).
              </p>
            )}
            {isTooLong && (
              <p className="text-amber-600 text-xs flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                O título está muito longo (máximo {maxLength} caracteres).
              </p>
            )}
          </div>
        </div>


        <div className="max-w-full rounded-xl border text-center border-slate-200 dark:border-slate-700 shadow-sm mt-4">
          <form action="submit" onSubmit={(e) => onSubmit(e)} className="dark:bg-slate-900 dark:text-slate-50 bg-slate-50 text-slate-900 rounded-xl border
                        border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="flex flex-col p-4">
              <textarea className={`  
                min-h-28 w-full p-3 
              text-slate-700 dark:text-slate-50 
              bg-slate-50 dark:bg-slate-600 
                border-2 border-slate-200 dark:border-slate-700 
                rounded-lg transition-all duration-200 outline-none resize-y 
              placeholder:text-slate-400 
              hover:border-slate-300 dark:hover:border-slate-500
              focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20`}
                value={conteudo} onChange={(e) => setConteudo(e.target.value)}
                placeholder=""
                required
              />
            </div>

            <div className="px-4 py-3 dark:bg-slate-900 dark:text-slate-50 bg-slate-50 text-slate-900 border-slate-200 dark:border-slate-700 flex justify-end">
              <CustomButton disabledFunction={disableButton} buttonText={"Criar novo Tópico"} />
            </div>
          </form>
        </div>
        <Notification isOpen={notification} type={notifType} mensagem={""} onCancel={() => { }} onLogin={notifType == 'error'} onConfirm={() => window.location.href = "/forum"} />

      </div>
    </div>
  );

}

export default NovoTopico;