import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../util/config";
import CustomButton from "../components/CustomButton";
import Notification from "../components/CustomNotification";

library.add(fab, faEyeSlash, faEye);

const Login = () => {
  const { t, i18n } = useTranslation();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [notification, setNotification] = useState<boolean>(false);
  const [error, setError] = useState<string>("")

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }

    let language = localStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);
    }
  }, []);

  function clickHandler() {
    setShowPass(!showPass);
  }

  const disableButton = () => {
    return email.trim().length < 5 || senha.trim().length < 5;
  }

  const onClickEntrar = () => {
    window.location.href = "/cadastro"

  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = `${API_BASE_URL}/sessao`;

    await axios.post(url, {
      email,
      senha,
    }).then((res) => {
      if (res.status == 201) {

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("idUsuario", res.data.idUsuario);
        localStorage.setItem("nomeUsuario", res.data.nomeUsuario);

        window.location.href = "/home";
      } else {

        setNotification(true);
        setError(res.data)

      }
    }).catch((error) => {
      if (error.response) {
        setNotification(true);
        setError(error.response.data)
      }

    });

  }

  return (
    <div className="bg-gray-100 dark:bg-slate-800/80 min-h-screen">
      <Header texto={t("Login")} />

      <div className=" flex flex-col items-center justify-center p-4">
        <div className="mb-2 flex flex-col items-center">
          <p className="text-slate-500 text-sm mt-1">
            {t("Acesse_Conta")}
          </p>
        </div>

        <div className="w-full max-w-xl  dark:bg-slate-900 dark:text-slate-50 bg-slate-50 text-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-700">
          <form onSubmit={(e) => onSubmit(e)} className="space-y-6">

            <div className="group">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1 mb-2 block">
                {t("Email")}
              </label>
              <div className="relative">
                <div
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <input
                  className="w-full pl-10 pr-4 py-3 text-slate-700 dark:text-slate-50 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 rounded-xl   placeholder:text-slate-400"
                  type="text" placeholder="exemplo@email.com" onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
            </div>

            <div className="group">
              <div className="flex justify-between items-center mb-2 ">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1 block">
                  {t("Senha")}
                </label>

              </div>
              <div className="relative">
                <div
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  className="w-full pl-10 pr-12 py-3 text-slate-700 dark:text-slate-50 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 rounded-xl   "
                  type={!showPass ? "password" : "text"} placeholder="••••••••" onChange={(e) =>
                    setSenha(e.target.value)}
                  value={senha}
                  required
                />

                <button type="button" onClick={clickHandler}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-2 transition-colors">
                  <FontAwesomeIcon icon={showPass ? faEye : faEyeSlash} />
                </button>

              </div>
              <a href="/esqueciSenha" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">
                {t("Esqueceu a senha?")}
              </a>
            </div>

            <div className="pt-2 flex justify-center">
              <CustomButton disabledFunction={disableButton} buttonText={t("Login")} />
            </div>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full "></div>
            </div>

          </div>

          <div className="notranslate text-center">
            <button type="button" onClick={onClickEntrar}
              className="w-full py-3 border-2 border-slate-100 text-slate-500  font-bold rounded-xl hover:bg-slate-50 hover:text-slate-900
              hover:border-slate-200 transition-all text-sm">
              {t("Sem_Conta")}
            </button>
          </div>
        </div>
      </div>

      <Notification isOpen={notification} type={"error"} mensagem={error || ": Usuário não cadastrado"} onCancel={() => setNotification(!notification)} onLogin={false} onConfirm={() => setNotification(!notification)} />


    </div>
  );
};

export default Login;
