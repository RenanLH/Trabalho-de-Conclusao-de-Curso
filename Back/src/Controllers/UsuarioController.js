import Usuario from "../Models/Usuario.js";
import bcrypt from "bcrypt";

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
        })

        return res.status(201).send(createdUsuario);

    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
    
}

async function getUsuario(req, res) {
    try {
        const {email, senha} = req.body;

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