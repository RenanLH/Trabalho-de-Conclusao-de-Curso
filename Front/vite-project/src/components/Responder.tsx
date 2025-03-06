import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";


const responder = () =>{
    const [conteudoResposta, setConteudoResposta] = useState<string> ("");

    async function onSubmit(e: FormEvent<HTMLFormElement> ){
        e.preventDefault();
        console.log(conteudoResposta);
    }


    return (
        <div>
            <div className="p-2 ml-6 mr-3 bg-slate-600">
                <Form onSubmit={onSubmit} >
                    <Form.Group controlId="formResposta" onChange={() => setConteudoResposta} >
                        <Form.Control className="h-40" size="sm" as="textarea" placeholder="resposta"/>
                    </Form.Group>                   
                </Form>
            </div>
            <div className="flex justify-end p-4" >
                <Button variant="primary" type="submit" >Enviar</Button>

            </div>

        </div>
    );
};

export default responder;