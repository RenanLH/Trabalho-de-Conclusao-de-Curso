import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../util/config";
import CustomButton from "../components/CustomButton";
import CustomNotification from "../components/CustomNotification";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";

const Cadastro = () => {
  const { t, i18n } = useTranslation();
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);

  const [nomeUsuario, setNomeUsuario] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");
  const [notification, setNotification] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [notifType, setNotiftype] = useState<"error"| "success">("error")
  const [onCancel, setOnCancel] = useState<()=>void>(()=>{})
  const [onConfirm, setOnConfirm] = useState<()=>void>(()=>{})

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

  function clickHandlerConfirm() {
    setShowPassConfirm(!showPassConfirm);
  }

  const validateEmail = (email: string) => {
    return email.trim().length > 4 && email.trim().length < 40 && email.match(/[a-z]+([0-9]|[a-z])*@[a-z]+\.[a-z]+/);

  }

  const validatePass = (senha: string, confirmarSenha: string) => {
    return senha.trim() && confirmarSenha.trim() && senha == confirmarSenha;

  }

  const disableButton = () => {
    return !validateEmail(email) || nomeUsuario.length < 5 || !validatePass(senha, confirmarSenha);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = `${API_BASE_URL}/usuarios`;

    try {

      await axios.post(url, {
        nomeUsuario,
        email,
        senha,
      }).then((res) => {
        if (res.status == 201) {
          setNotification(true);
          setNotiftype("success");
          setOnCancel(() => {});
          setOnConfirm(()=> { window.location.href = "/login";});

        } else {
          setNotification(true);
          setError("Erro" + res.status);
          setNotiftype("error");
          setOnCancel(() => setNotification(!notification));
          setOnConfirm(onCancel);

        }

      }).catch((error) => {
        if (error.response) {
          setNotification(true);
          setError(error.response.data);
          setNotiftype("error");
          setOnCancel(() => setNotification(!notification));
          setOnConfirm(onCancel);

        }

      })

    } catch (error) {
      console.log("Erro ao efetuar cadastro");
    }

  }

 return (
    <div className="bg-gray-100 dark:bg-slate-800/80 min-h-screen">
      <div className="w-full">
        <Header texto={t("Cadastro")} />
      </div>

      <div className="flex flex-col items-center justify-center">
        <p className="text-slate-500 dark:text-slate-50 mt-5 mb-5">
          Crie sua conta para começar a interagir
        </p>

        <div className="w-full max-w-xl dark:bg-slate-900 dark:text-slate-50 bg-slate-50 text-slate-900 rounded-2xl shadow-xl p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            
            <div className="relative group">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1 mb-1 block">
                {t("Usuario")}
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  className="w-full pl-10 pr-4 py-3 text-slate-700 dark:text-slate-50 bg-slate-50 dark:bg-slate-800 border-transparent border-2 rounded-xl placeholder:text-slate-400 focus:border-blue-500 outline-none transition-all"
                  type="text"
                  placeholder={t("Usuario")}
                  onChange={(e) => setNomeUsuario(e.target.value)}
                  value={nomeUsuario}
                  required
                />
              </div>
            </div>

            <div className="relative group">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1 mb-1 block">
                {t("Email")}
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  className="w-full pl-10 pr-4 py-3 text-slate-700 dark:text-slate-50 bg-slate-50 dark:bg-slate-800 border-transparent border-2 rounded-xl placeholder:text-slate-400 focus:border-blue-500 outline-none transition-all"
                  type="email"
                  placeholder="exemplo@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
            </div>

            <div className="relative group">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1 mb-1 block">
                {t("Senha")}
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  className="w-full pl-10 pr-12 py-3 text-slate-700 dark:text-slate-50 bg-slate-50 dark:bg-slate-800 border-transparent border-2 rounded-xl placeholder:text-slate-400 focus:border-blue-500 outline-none transition-all"
                  type={!showPass ? "password" : "text"}
                  placeholder="••••••••"
                  onChange={(e) => setSenha(e.target.value)}
                  value={senha}
                  required
                />
                <button
                  type="button"
                  onClick={clickHandler}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 p-2 transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="relative group">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1 mb-1 block">
                {t("Confirmar Senha")}
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  className="w-full pl-10 pr-12 py-3 text-slate-700 dark:text-slate-50 bg-slate-50 dark:bg-slate-800 border-transparent border-2 rounded-xl placeholder:text-slate-400 focus:border-blue-500 outline-none transition-all"
                  type={!showPassConfirm ? "password" : "text"}
                  placeholder="••••••••"
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  value={confirmarSenha}
                  required
                />
                <button
                  type="button"
                  onClick={clickHandlerConfirm}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 p-2 transition-colors"
                >
                  {showPassConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <CustomButton disabledFunction={disableButton} buttonText="Criar Conta" />
            </div>

            <p className="text-center text-sm text-slate-500 pt-4">
              Já tem uma conta?{" "}
              <a href="/login" className="text-blue-600 font-bold hover:underline">
                {t("Login")}
              </a>
            </p>

            <CustomNotification
              isOpen={notification}
              type={notifType}
              mensagem={error}
              onCancel={onCancel}
              onLogin={false}
              onConfirm={onConfirm}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
