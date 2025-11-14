import axios from "axios";
import { FormEvent, useState } from "react";
import { API_BASE_URL } from "../config";

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

        let url = `${API_BASE_URL}/respostas/mensagem`;

        if(idMensagem == "" || idUsuario == ""){
            url = `${API_BASE_URL}/mensagens`;
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
                        <textarea className="h-32 border-2  border-blue-800 rounded" value={conteudoResposta} onChange={(e) => setConteudoResposta(e.target.value)} required />
                    </div>
                    <div className="flex justify-end">
                        <button 
                        disabled={conteudoResposta == ""} 
                        className="mt-3 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default responder;