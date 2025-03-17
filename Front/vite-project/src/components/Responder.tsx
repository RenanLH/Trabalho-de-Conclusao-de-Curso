import axios from "axios";
import { FormEvent, useState } from "react";

type ResponderParams = {
    idMensagem: string;
    idUsuario: string;
    idResposta: string|undefined;
  };

const responder = (param:ResponderParams) =>{

    let { idMensagem, idUsuario, idResposta } = param;
    const [conteudoResposta, setConteudoResposta] = useState<string> ("");

    async function onSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();

        let url = "http://localhost:9875/api/respostas/mensagem";

        if(idMensagem == "" || idUsuario == ""){
            url = "http://localhost:9875/api/mensagens";
            idUsuario = sessionStorage.getItem("idUsuario") || "";
            const token = sessionStorage.getItem("token") || "";
            if(idUsuario == ""){
                console.log("Usuário não autenticado");
                return;
            }

            const resultCreate = await axios.post(url, {
                idUsuario: idUsuario,
                token: token,
                conteudoMensagem: conteudoResposta
            });

            if(resultCreate.status == 201){
                console.log("Mensagem criada com sucesso");
                window.location.href = "/mensagens";
            }
            return;
        
        }

        idUsuario = sessionStorage.getItem("idUsuario") || "";

        const result = await axios.post(url, {
            idMensagem: idMensagem,
            idUsuario: idUsuario,
            idResposta: idResposta,
            conteudoResposta: conteudoResposta
        });
        if (result.status == 200){
            console.log("Resposta enviada com sucesso");
            //refresh page
            window.location.reload();
        }
    }

    return (
        <div>
            <div className="p-2 ml-6 mr-3 ">
                <form action="submit" onSubmit={(e) => onSubmit(e)}>
                    <div className="flex flex-col  ">
                        <textarea className="h-32 border-2  border-blue-800 rounded" value={conteudoResposta} onChange={(e) => setConteudoResposta(e.target.value)}/>
                    </div>
                    <div className="flex justify-end">
                        <button disabled={conteudoResposta == ""}  className="border justify-center p-2 w-28 rounded mb-4  text-white bg-black" type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default responder;