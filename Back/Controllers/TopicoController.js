import Topico from "../Models/Topico.js";
import Usuario from "../Models/Usuario.js";
import Resposta from "../Models/Resposta.js";
import Sessao from "../Models/Sessao.js";

async function createTopico(req, res) {
    try {
        
        const { idUsuario, token, titulo, conteudo, respostas } = req.body;
        const dataCriacao = Date.now();

        const validaUsuario = await Sessao.findOne({
            idUsuario,
            token
        });

        if (!validaUsuario) {
            return res.status(404).send("Usuario nao encontrado");
        }

        let usuario = await Usuario.Model.findById(idUsuario);

        if (usuario.role != Usuario.role.ADMIN) {
            return res.status(403).send("Forbidden");
        }

        const createdTopico = await Topico.create({
            idUsuario,
            titulo,
            conteudo,
            dataCriacao,
        });

        let idResposta = undefined;

        if (respostas) {
            for (const resposta of respostas) {
                let idUser = resposta.idUsuario;
                let nomeUsuario = resposta.nomeUsuario;
                let conteudoResposta = resposta.conteudoMensagem;

                usuario = await Usuario.Model.findById(idUser)

                if (usuario && usuario.role == Usuario.role.USER) {
                    idUser = idUsuario;
                    nomeUsuario = "Anônimo"
                }
                const dataEnvio = Date.now();

                if (idResposta != undefined && idResposta != null ) {
                    const respostaCreated = await Resposta.create({
                        idUsuario: idUser,
                        nomeUsuario: nomeUsuario,
                        idResposta: idResposta,
                        conteudoResposta: conteudoResposta,
                        dataEnvio: dataEnvio,
                    });
                    idResposta = respostaCreated._id;
                }else {

                    const respostaCreated = await Resposta.create({
                        idUsuario: idUser,
                        nomeUsuario: nomeUsuario,
                        idTopico: createdTopico._id,
                        conteudoResposta: conteudoResposta,
                        dataEnvio: dataEnvio,
                    });

                    idResposta = respostaCreated._id;
                }
            }

        }

        return res.status(201).send(createdTopico);
    } catch (error) {
        console.log(error);
        return res.status(500).send("erro do servidor")
    }
}

async function getTopico(req, res) {

    try {
        const idTopico = req.params.idTopico;

        const topicoDb = await Topico.findById(idTopico);
        if (topicoDb) {
            const idUsuario = topicoDb.idUsuario;
            const usuario = await Usuario.Model.findById(idUsuario);

            if (usuario) {
                topicoDb.idUsuario = usuario.nomeUsuario;
                return res.status(200).send(topicoDb);
            }
        }
        return res.status(400).json("Error");

    } catch (error) {
        return res.status(500).send("erro do servidor")
    }

}

async function index(req, res) {

    const { page, limit } = req.params

    try {
        const topicos = await Topico.find().limit(limit);

        if (!topicos || !topicos.length) {
            return res.status(404);
        }

        return res.status(200).send(topicos);

    } catch (error) {
        return res.status(500).send("erro do servidor")
    }

}

async function search(req, res) {

    const { page, limit, query } = req.params

    try {
        console.log(query);
        let terms = query.split(" ");
        terms = terms.filter((value, id) => (value.trim().length > 2));

        const topicos = await Topico.find({
            $or: terms.map(term => ({
                titulo: new RegExp(term, "i")
            }))
        });

        if (!topicos || !topicos.length) {
            return res.status(404).send("not found");
        }

        return res.status(200).send(topicos);

    } catch (error) {
        return res.status(500).send("erro do servidor")
    }

}

export default { createTopico, getTopico, index, search };