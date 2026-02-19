import QaA from "../Models/QaA.js"
import Usuario from "../Models/Usuario.js"
import Sessao from "../Models/Sessao.js"


async function createPergunta(req, res) {
    try {
        const {pergunta, resposta, idUsuario, token} = req.body;

        const validaUsuario = await Sessao.findOne({
            idUsuario,
            token
        });

        if (!validaUsuario){
            return res.status(404).send("Usuario não autenticado");
        }
    
        const usuario = await Usuario.Model.findById(idUsuario);

        if (usuario.role != Usuario.role.ADMIN) {
            return res.status(403).send("Forbidden");
        }


        const perguntaExiste = await QaA.findOne({
            pergunta,
            resposta,
        });

        if (perguntaExiste){
            return res.status(400).send("Pergunta ja esta cadastrada");
        }

        const createdPergunta = await QaA.create({
            pergunta,
            resposta,
        });

        return res.status(201).send(createdPergunta);

    } catch (error) {
        return res.status(500).send("erro do servidor")
    }
    
}

async function updatePergunta(req, res) {
    try {
        const {pergunta, resposta, idUsuario, token, id} = req.body;

        const validaUsuario = await Sessao.findOne({
            idUsuario,
            token
        });

        if (!validaUsuario){
            return res.status(404).send("Usuario não autenticado");
        }
    
        const usuario = await Usuario.Model.findById(idUsuario);

        if (usuario.role != Usuario.role.ADMIN) {
            return res.status(403).send("Forbidden");
        }

        const perguntaExiste = await QaA.findById(id);

        if (!perguntaExiste){
            return res.status(400).send("Pergunta não encontrada!");
        }

        const updatedPergunta = await QaA.updateOne(
            { _id: perguntaExiste.id}, {
                $set: {
                    pergunta,
                    resposta
                }
            }
        
        );

        return res.status(201).send("successo");

    } catch (error) {
        console.log(error)
        return res.status(500).send("erro do servidor")
    }
    
}


async function deletePergunta(req, res) {
    try {
        const { idUsuario, token, ids} = req.body;

        const validaUsuario = await Sessao.findOne({
            idUsuario,
            token
        });

        if (!validaUsuario){
            return res.status(404).send("Usuario não autenticado");
        }
    
        const usuario = await Usuario.Model.findById(idUsuario);

        if (usuario.role != Usuario.role.ADMIN) {
            return res.status(403).send("Forbidden");
        }

        for (const id of ids){
            let  perguntaExiste = await QaA.findById(id);
            if (perguntaExiste){
                await QaA.findByIdAndDelete(id);
            }
        }
        return res.status(200).send("successo");

    } catch (error) {
        console.log(error)
        return res.status(500).send("erro do servidor")
    }
    
}

async function index(req, res) {

    try {

        const perguntasRespostas = await QaA.find();

        if (!perguntasRespostas || !perguntasRespostas.length ){

            return res.status(404).send("Nenhuma pergunta encontrada");
        }
        return res.status(200).send(perguntasRespostas);


    } catch (error) {
        return res.status(500).send("erro do servidor")
    }
    
}


export default {createPergunta, index, updatePergunta, deletePergunta}