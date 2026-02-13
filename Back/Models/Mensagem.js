import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    idMensagem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mensagem',
        required: false,
    },
    tituloMensagem: {
        type: String,
        required: false,
    },
    conteudoMensagem: {
        type: String,
        required: true,
    },
    statusMensagem: {
        type: String, 
        required: false,
    },
    dataEnvio: {
        type: Date,
        required: true,
    },
    nomeUsuario: {
        type: String,
        required: false,
    }

})

export default mongoose.model('Mensagem', Schema); 