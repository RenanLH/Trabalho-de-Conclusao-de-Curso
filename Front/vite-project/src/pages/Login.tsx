import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

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
    const url = "http://localhost:9875/api/sessao";

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
   
      <div className="container mt-4 w-2/4" style={{ width: "40%" }}>

        <form action="" onSubmit={(e) => onSubmit(e)}>
          
          <input className="mb-3 p-3 w-full rounded bg-gray-300"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          
          <div className="flex gap-3  items-center ">
            <input className=" p-3 w-full h-1/2 rounded bg-gray-300"
              type={showPass ? "password" : "text"}
              placeholder="Senha"
              onChange={(e) => setSenha(e.target.value)}
              value={senha}/>
            <FontAwesomeIcon
                      icon={showPass ? faEye : faEyeSlash}
                      onClick={clickHandler}/>
          </div>
          
          <input
            className="mb-4 p-3 w-full rounded text-white bg-black"
            type="submit"
            value="Entrar"
          />
        </form>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          style={{
            width: "fit-content",
            backgroundColor: "orangered",
            color: "white",
            padding: "15px",
          }}
          className="form-control"
          type="button"
          value="Cadastro"
          onClick={() => {
            window.location.href = "/cadastro";
          }}
        />
      </div>
    </div>
  );
};

export default Login;
