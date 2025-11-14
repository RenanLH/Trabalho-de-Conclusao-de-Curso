import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../config";

library.add(fab, faEyeSlash, faEye);

const Login = () => {
  const { t, i18n } = useTranslation();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  useEffect(() => { 
    let language = sessionStorage.getItem("language");
    if (!language) 
      language = "pt";
    i18n.changeLanguage(language);
  },[]);
  

  function clickHandler() {
    setShowPass(!showPass);
  }


  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = `${API_BASE_URL}/sessao`;

    //axios send cookies
    //axios.defaults.withCredentials = true;
    
    const result = await axios.post(url, {
      email,
      senha,
    });

    if(result.status == 201){

      sessionStorage.setItem("token", result.data.token);
      sessionStorage.setItem("idUsuario", result.data.idUsuario);

      console.log("Login efetuado com sucesso");
      
      window.location.href = "/home";
      //redirect to another page
    }
    else{
      console.log("Erro ao efetuar login");
    }

    //axios.defaults.withCredentials = false;

  }

  return (
    <div>
      <Header texto={t("Login")} changeLanguage={(e:string) => {i18n.changeLanguage(e)}}/>
   
      <div className="container mt-4 w-2/4 text-center" style={{ width: "40%" }}>

        <form action="" onSubmit={(e) => onSubmit(e)}>
          
          <input className="mb-3 p-3 w-full rounded bg-gray-300"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          
          <div className="relative w-full">
              <input
                className="p-3 w-full rounded bg-gray-300 pr-10"
                type={!showPass ? "password" : "text"}
                placeholder={t("Senha")}
                onChange={(e) => setSenha(e.target.value)}
                value={senha}
              />
              <FontAwesomeIcon
                icon={showPass ? faEye : faEyeSlash}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={clickHandler}
              />
            </div>

          <input
            className=" mb-4 mt-3 p-3 text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            type="submit"
            value="Entrar"
          />

       
        </form>

        <input
          className="form-control"
          type="button"
          value={t("Sem_Conta")}
          onClick={() => {
            window.location.href = "/cadastro";
          }}
        />
      </div>

      
        
    </div>
  );
};

export default Login;
