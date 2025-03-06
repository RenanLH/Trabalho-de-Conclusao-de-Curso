import Usuario from "../Models/Usuario.js";

 async function createUsuario(req, res) {
    try {
        const {email, senha, nomeUsuario} = req.body;
        console.log(email, senha, nomeUsuario);

        const usuarioExistente = Usuario.findOne({
            email
        });

        if (usuarioExistente){
            return res.status(400).send({message: 'Usuario ja esta cadastrado'});
        }

        const createdUsuario = await Usuario.create({
            email,
            senha,
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
        const {email} = req.params;

        const usuario = await Usuario.findOne({
            email,
        })
        if (!usuario)
            return res.status(404).send("Usuario não encontrado");

        console.log(usuario);
        return res.status(200).send(usuario);

    } catch (error) {
        console.log(error);
        return res.status(400).send("error");
    }
    
}
export default {createUsuario, getUsuario};