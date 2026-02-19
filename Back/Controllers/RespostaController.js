import Resposta from "../Models/Resposta.js";
import Topico from "../Models/Topico.js";
import Usuario from "../Models/Usuario.js";

async function getRespostas(req, res) {
    try {
        const {idResposta} = req.params;

        let respostas = await Resposta.find(
            {idResposta}
        );

        if (!respostas || !respostas.length)
            return res.status(404).send("Nenhuma resposta encontrada");

        return res.status(200).send(respostas);

    } catch (error) {
        return res.status(500).send("erro do servidor")
    }
    
}


async function getRespostasTopico(req, res) {
    try {
        const {idTopico} = req.params;

        let respostas = await Resposta.find(
            {idTopico}
        );

        if (!respostas || !respostas.length)
            return res.status(404).send("Nenhuma resposta encontrada");

        return res.status(200).send(respostas);

    } catch (error) {
        return res.status(500).send("erro do servidor")
    }
    
}

async function createResposta(req, res) {

    try {
        const {idUsuario, idResposta, conteudoResposta} = req.body;

        const respostaOriginal = await Resposta.findById(
            idResposta
        );

        if (!respostaOriginal){
            return res.status(400).send("Resposta nao encontrada");
        }

        const usuario = await Usuario.Model.findById(idUsuario);

        if (!usuario){
            return res.status(400).send("Usuario nao encontrado");
        }

        const nomeUsuario = usuario.nomeUsuario;

        const dataEnvio = Date.now();

        const resposta = await Resposta.create({
            idUsuario,
            nomeUsuario,
            idResposta, 
            conteudoResposta,
            dataEnvio,
        });

        if (!resposta){
            return res.status(500).send("erro ao criar resposta");
        }
       
        return res.status(200).send(resposta);
        
    } catch (error) {
        return res.status(500).send("erro do servidor")
    }
    
}

async function createRespostaTopico(req, res) {

    try {

        const {idUsuario, idTopico, conteudoResposta} = req.body;
        let nomeUsuario = "";

        const topico = await Topico.findById(
            idTopico
        );

        if (!topico){
            return res.status(400).send("Topico nao encontrado");
        }

        const usuario = await Usuario.Model.findById(idUsuario);

        if (!usuario){
            return res.status(400).send("Usuario nao encontrado");

        }

        nomeUsuario = usuario.nomeUsuario;

        const dataEnvio = Date.now();

        const resposta = await Resposta.create({
            idUsuario,
            nomeUsuario,
            idTopico,
            conteudoResposta,
            dataEnvio,
        });

        if (!resposta){
            return res.status(500).send("erro ao criar resposta");
        }

       
        return res.status(200).send(resposta);
        
    } catch (error) {
        return res.status(500).send("erro do servidor")
    }
    
}

export default {createResposta, getRespostasTopico, getRespostas, createRespostaTopico};