import Sessao from '../Models/Sessao.js';
import Usuario from '../Models/Usuario.js';
import bcrypt from "bcrypt";
import crypto from "crypto";


async function createSessao(req, res) {
    try {
        const {email, senha} = req.body;

        console.log(email, senha);

        const usuario = await Usuario
            .findOne({email});

        if (!usuario || !await bcrypt.compare(senha, usuario.senha))
            return res.status(404).send("Usuario nao encontrado");
        

        const idUsuario = usuario._id;
        const token = crypto.randomBytes(16).toString('hex');

        const dataCriacao = new Date(Date.now());
    
        const dataExpiracao = new Date(dataCriacao);
        dataExpiracao.setDate(dataCriacao.getDate() + 7);

        const createdSessao = await Sessao.create({
            idUsuario,
            token,
            dataCriacao,
            dataExpiracao
        });

        console.log(createdSessao);

        return res.status(201).send(createdSessao); 

    } catch (error) {
        console.log(error);
        return res.status(400).send("error");
    }
}

async function getSessao(req, res) {
    try {
        const {token} = req.cookies;

        const sessao = await Sessao.findOne({token});

        if (!sessao )
            return res.status(404).send("Sessao nao encontrada");

        if(sessao.dataExpiracao < new Date()){
            await Sessao.deleteOne({token});

            return res.status(401).send("Sessao expirada");
        }

        return res.status(200).send(sessao);

    }catch (error) {
        return res.status(400).send("error");
    }
    
}

export default {createSessao, getSessao};

