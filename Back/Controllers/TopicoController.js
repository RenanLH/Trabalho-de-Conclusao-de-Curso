import Topico from "../Models/Topico.js";
import Usuario from "../Models/Usuario.js";

async function createTopico(req, res) {
    const {idUsuario, titulo, conteudo} = req.body;

    const dataCriacao = Date.now();

    try {
        const createdTopico = await Topico.create({
            idUsuario,
            titulo,
            conteudo,
            dataCriacao, 
        });

        return res.status(201).send(createdTopico);
    } catch (error) {
        return res.status(400).send("error");
    }
 }

async function getTopico(req, res) {

    try {
        const idTopico = req.params.idTopico;

        const topicoDb = await Topico.findById(idTopico);
        if (topicoDb){
            const idUsuario = topicoDb.idUsuario;
            const usuario = await Usuario.findById(idUsuario);

            if (usuario){
                topicoDb.idUsuario = usuario.nomeUsuario;
                return res.status(200).send(topicoDb);  
            }
        }
        return res.status(400).json("Error");  

    } catch (error) {
        res.status(400).json(`error ${error}`);
    }

}

async function index(req, res) {

    const {page, limit} = req.params

    try {
        const topicos = await Topico.find().limit(limit);

        if (!topicos || !topicos.length){
            return res.status(404);
        }

        return res.status(200).send(topicos);
        
    } catch (error) {
        return res.status(400).send("error")
    }
    
}

export default {createTopico, getTopico, index};