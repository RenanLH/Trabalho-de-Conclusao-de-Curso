import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    idUsuario: {
        type: String,
        required: true,
    },
    titulo: {
        type: String,
        required: true,
    },
    conteudo: {
        type: String,
        required: true,
    },
    dataCriacao: {
        type: Date,
        required: true,
    },

})

export default mongoose.model('Topico', Schema); 