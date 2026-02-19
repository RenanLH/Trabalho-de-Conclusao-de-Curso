import mongoose from "mongoose";

const status = {
  F: "Finalizada",
  R: "Respondida",
  NR: "Nao Respondida",
}

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

const Model = mongoose.model('Mensagem', Schema); 

export default {Model, status}