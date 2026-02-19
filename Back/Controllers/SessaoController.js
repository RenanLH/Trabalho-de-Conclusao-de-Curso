import Sessao from '../Models/Sessao.js';
import Usuario from '../Models/Usuario.js';
import bcrypt from "bcrypt";
import crypto from "crypto";


async function createSessao(req, res) {
    try {
        const {email, senha} = req.body;

        const usuario = await Usuario.Model.findOne({email});

        if (!usuario)
            return res.status(404).send("Email não cadastrado!");
        
        if (!await bcrypt.compare(senha, usuario.senha))
            return res.status(404).send("Senha Incorreta!");

        const idUsuario = usuario._id;
        let token = crypto.randomBytes(16).toString('hex');

        const dataCriacao = new Date(Date.now());
    
        const dataExpiracao = new Date(dataCriacao);
        dataExpiracao.setDate(dataCriacao.getDate() + 7);

        let role = "";

        if (usuario.role && usuario.role == "admin")
            role = "8354c67bf5dab839";
        else 
            role = "8ae76d76881f379c"    
        
        token = token + role;

        const nomeUsuario = usuario.nomeUsuario;

        const createdSessao = await Sessao.create({
            idUsuario,
            token,
            nomeUsuario,
            dataCriacao,
            dataExpiracao
        });
        createSessao.role = role;

        return res.status(201).send(createdSessao); 

    } catch (error) {
        return res.status(500).send("erro do servidor")
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
        return res.status(500).send("erro do servidor")
    }
    
}

export default {createSessao, getSessao};

