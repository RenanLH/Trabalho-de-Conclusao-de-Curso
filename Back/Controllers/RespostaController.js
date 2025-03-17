import Mensagem from "../Models/Mensagem.js";
import Resposta from "../Models/Resposta.js";
import Usuario from "../Models/Usuario.js";

async function sortRespostas(respostaArray) {

    try {
        let sortedArray = [];

        let currentID = respostaArray.find((resposta) => resposta.idResposta == null || resposta.idResposta == undefined);
    
        while(sortedArray.length < respostaArray.length){

            sortedArray.push(currentID);

            let nextID = respostaArray.find((resposta) => resposta.idResposta == currentID._id);

            if (nextID){
                currentID = nextID;
            }   
             
        }

        return sortedArray;
    } catch (error) {
        console.log(error);
        return [];
    }
  
    
}

async function getRespostas(req, res) {
    try {
        const {idMensagem} = req.params;

        let respostas = await Resposta.find(
            {idMensagem}
        );

        if (!respostas || !respostas.length)
            return res.status(404).send("Nenhuma resposta encontrada");


        for (const resposta of respostas){
            let id = resposta.idUsuario.toString();

            let usuario = await Usuario.findById(id);

            if (usuario)
                resposta.nomeUsuario = usuario.nomeUsuario;

        }

        return res.status(200).send(respostas);

    } catch (error) {
        console.log(error);
        return res.status(400).send("error");
    }
    
}

async function createResposta(req, res) {

    try {

        const {idUsuario, idMensagem, idResposta, conteudoResposta} = req.body;
        let nomeUsuario = "";
        console.log('a ',idUsuario, 'b ', idMensagem, 'c', idResposta, 'd ',conteudoResposta);

        const mensagem = await Mensagem.model.findById(
            idMensagem
        );

        if (!mensagem){
            return res.status(400).send("Mensagem nao encontrada");
        }

        const usuario = await Usuario.findById(idUsuario);

        if (usuario){
            nomeUsuario = usuario.nomeUsuario;
        }


        //if (mensagem.idUsuario == idUsuario){
        //    return res.status(400).send("Erro nao eh possivel responder a propria mensagem");
        //}

        const dataEnvio = Date.now();

        const resposta = await Resposta.create({
            idUsuario,
            nomeUsuario,
            idMensagem,
            idResposta, 
            conteudoResposta,
            dataEnvio,
        });

        if (!resposta){
            return res.status(500).send("erro ao criar resposta");
        }

       
        return res.status(200).send(resposta);
        
    } catch (error) {
        console.log(error);
        return res.status(400).send("error");
    }
    
}

export default {createResposta, getRespostas};