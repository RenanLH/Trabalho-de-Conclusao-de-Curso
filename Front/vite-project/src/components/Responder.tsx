import { Button, Form } from "react-bootstrap";


const responder = () =>{
    return (
        <div>
            <div className="p-2 ml-6 mr-3 bg-slate-600">
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group controlId="formResposta" >
                        <Form.Control className="h-40" size="sm" as="textarea" placeholder="resposta"/>
                    </Form.Group>                   
                </Form>
            </div>
            <div className="flex justify-end p-4 bg-red-500" >
                <Button variant="primary" type="submit" >Enviar</Button>

            </div>

        </div>
    );
};

export default responder;