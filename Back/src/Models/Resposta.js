import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    idResposta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resposta',
        required: false,
    },
    IdMensagem:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mensagem',
        required: false,
    },
    nomeUsuario:{
        type: String,
        required: false,
    },
    conteudoResposta: {
        type: String,
        required: true,
    },
    dataEnvio: {
        type: Date,
        required: true,
    },

})

export default mongoose.model('Resposta', Schema); 