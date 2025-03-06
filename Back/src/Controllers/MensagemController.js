import Mensagem from "../Models/Mensagem.js";
import Usuario from "../Models/Usuario.js";

 async function createMensagem(req, res) {
    try {
        const {idUsuario, conteudoMensagem} = req.body;

        let statusMensagem = Mensagem.statusMensagem.NF;

        const mensagemNaoFinalizada = await Mensagem.model.findOne({
            idUsuario,
            statusMensagem
        });

        statusMensagem = Mensagem.statusMensagem.NR;

        const mensagemNaoRespondida = await Mensagem.model.findOne({
            idUsuario,
            statusMensagem
        });

        console.log(mensagemNaoRespondida);

        if (mensagemNaoRespondida || mensagemNaoFinalizada){
            return res.status(400).send({message: 'Uma mensagem não finalizada já existe.'});
        }

        statusMensagem = Mensagem.statusMensagem.NR;

        const dataEnvio = Date.now();

        const createdMensagem = await Mensagem.model.create({
            idUsuario, 
            conteudoMensagem, 
            statusMensagem,
            dataEnvio
        })

        if (!createdMensagem){
            return res.status(400).send("Erro ao enviar a mensagem");
        }

        return res.status(201).send(createdMensagem);

    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
    
}

 async function getMensagemUsuario(req, res) {
    try {
        const {idUsuario} = req.params;

        const mensagens = await Mensagem.model.find({
            idUsuario,
        })
        if (!mensagens || !mensagens.length)
            return res.status(404).send("Nenhuma mensagem encontrada");

        console.log(mensagens);
        return res.status(200).send(mensagens);

    } catch (error) {
        console.log(error);
        return res.status(400).send("error");
    }
    
}

async function getMensagemId(req, res) {
    try {
        const {idMensagem} = req.params;

        const mensagem = await Mensagem.model.findById(idMensagem);

        if (!mensagem)
            return res.status(404).send("Mensagem nao encontrada");


        let id = mensagem.idUsuario.toString();

        let usuario = await Usuario.findById(id);

        if (usuario)
            mensagem.nomeUsuario = usuario.nomeUsuario;

        return res.status(200).send(mensagem);

    } catch (error) {
        console.log(error);
        return res.status(400).send("error");
    }
    
}


async function getIndex(req, res) {
    try {
        let {statusMensagem} = req.params;

        statusMensagem = Mensagem.getStatusMensagem(statusMensagem);

        const mensagens = await Mensagem.model.find({
            statusMensagem,
        })
        if (!mensagens || !mensagens.length)
            return res.status(404).send("Nenhuma mensagem encontrada");

        for (const mensage of mensagens){
            let id = mensage.idUsuario.toString();

            let usuario = await Usuario.findById(id);

            if (usuario)
                mensage.nomeUsuario = usuario.nomeUsuario;

        }

        return res.status(200).send(mensagens);

    } catch (error) {
        console.log(error);
        return res.status(400).send("error");
    }
    
}

export default {createMensagem, getMensagemUsuario, getMensagemId, getIndex};