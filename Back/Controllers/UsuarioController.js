import Usuario from "../Models/Usuario.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import Sessao from "../Models/Sessao.js";

async function hashPass(senha) {
    try {
        const salt = await bcrypt.genSalt(10);
        const encriptPass = await bcrypt.hash(senha, salt);
        return encriptPass;
    } catch (error) {
        console.log(error);
        return null;
    }

}

const role = {
    ADMIN:'admin',
    USER:'user',
}

async function createUsuario(req, res) {
    try {
        const {email, senha, nomeUsuario} = req.body;
        console.log(email, senha, nomeUsuario);

        const usuarioExistente = await Usuario.findOne({
            email
        });

        if (usuarioExistente){
            return res.status(400).send({message: 'Usuario ja esta cadastrado'});
        }

        const hashedPass = await hashPass(senha);

        if (!hashedPass){
            return res.status(500);
        }

        const createdUsuario = await Usuario.create({
            email,
            senha: hashedPass,
            nomeUsuario,
            role: role.USER
        })

        if (!createdUsuario){
            return res.status(400).send("Erro ao criar o usuario");
        }

        const idUsuario = createdUsuario._id;
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
        return res.status(400).send(error);
    }
    
}

async function getUsuario(req, res) {
    try {
        const {email, senha} = req.body;

        console.log(email, senha);

        const usuario = await Usuario.findOne({email});

        if (!usuario|| !await bcrypt.compare(senha, usuario.senha))
            return res.status(404).send("senha incorreta");

        console.log(usuario);
        return res.status(200).send(usuario);

    } catch (error) {
        console.log(error);
        return res.status(400).send("error");
    }

}

async function getIndexUsuario(req, res) {
try {

    const usuario = await Usuario.find();

    if (!usuario || !usuario.length)
        return res.status(404).send("Nenhum usuario encontrado");

    return res.status(200).send(usuario);

} catch (error) {
    console.log(error);
    return res.status(400).send("error");
}

}
export default {createUsuario, getUsuario, getIndexUsuario};