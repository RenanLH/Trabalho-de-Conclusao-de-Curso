import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../config";

library.add(fab, faEyeSlash, faEye);

const Cadastro = () => {
  const { t, i18n } = useTranslation();
  const [showPass, setShowPass] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  function clickHandler() {
    setShowPass(!showPass);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = `${API_BASE_URL}/usuarios`;

    try {

      const result = await axios.post(url, {
        nomeUsuario,
        email,
        senha,
      });
  
      if (result.status == 201) {
        console.log(result.data);

        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("idUsuario", result.data.idUsuario);
        
        console.log("Cadastro efetuado com sucesso");
        
        window.location.href = "/home"
  
      } else {
        console.log("Erro ao efetuar cadastro");
      }
      
    } catch (error) {
      console.log("Erro ao efetuar cadastro");
    }
    
  }

  return (
    <div>
      <Header texto={t("Cadastro")} changeLanguage={(e:string) => {i18n.changeLanguage(e);}}/>
        <div className="container mt-4 text-center"  style={{ width: "40%" }}>

          <form action="" onSubmit={(e) => onSubmit(e)}>
           
            <input className="mb-3 p-3 w-full rounded bg-gray-300"
              type="text"
              placeholder="Nome Completo"
              onChange={(e) => setNomeUsuario(e.target.value)}
              value={nomeUsuario}
            />
            
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
              className="mb-4 mt-2 p-3  text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              type="submit"
              value="Criar Conta"
            />
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
