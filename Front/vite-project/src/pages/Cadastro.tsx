import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

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
    const url = "http://localhost:9875/api/usuarios";

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
      <Header texto={t("Cadastrar")} changeLanguage={(e:string) => {i18n.changeLanguage(e);}}/>
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
              className="mb-4 mt-2 p-3 rounded text-white bg-black"
              type="submit"
              value="Criar Conta"
            />
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
