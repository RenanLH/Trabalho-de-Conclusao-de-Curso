import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faEyeSlash, faEye);

const Cadastro = () => {
  const [showPass, setShowPass] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);

  function clickHandler() {
    setShowPass(!showPass);
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="grid grid-flow-col grid-cols-5">
        <div className="mt-20 max-w-96 col-start-3 col-end-5 items-center text-center ">
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
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
