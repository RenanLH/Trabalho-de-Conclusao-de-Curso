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
    const url = "http://localhost:9875/usuarios";
    const result = await axios.post(url, {
      nomeUsuario,
      email,
      senha,
    });

    if (result.status == 200) {
      console.log("Cadastro efetuado com sucesso");
      //redirect to another page
    } else {
      console.log("Erro ao efetuar cadastro");
    }
  }


  return (
    <div>
      <Header texto={t("Registar")} changeLanguage={(e:string) => {i18n.changeLanguage(e);}}/>
        
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


          {/*
          
          <Form>
            <Form.Group className="mb-4 " controlId="formName">
              <Form.Control type="text" placeholder="Nome" />
            </Form.Group>

            <Form.Select className="mb-4" aria-label="formGender" >
              <option disabled>Genero</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </Form.Select>

            <Form.Group className="mb-4 " controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <div className="grid grid-flow-col grid-cols-5">
              <div className="col-start-1 col-end-6">
                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Control
                    type={showPass ? "password" : "text"}
                    placeholder="Senha"
                  />
                </Form.Group>
              </div>
              <div>
                <InputGroup className="col-start-7 justify-end h-9 ">
                  <InputGroup.Text>
                    <FontAwesomeIcon
                      icon={showPass ? faEye : faEyeSlash}
                      size="1x"
                      width="20px"
                      transform="left-1"
                      onClick={clickHandler}
                    />{" "}
                  </InputGroup.Text>
                </InputGroup>
              </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Li e concordo com os termos de uso da plataforma"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Entrar
            </Button>
          </Form>
          
          
          */}
          <footer className="bg-blue-700 text-white p-4 position-absolute bottom-0 w-full">
          </footer>
      </div>
  );
};

export default Cadastro;
