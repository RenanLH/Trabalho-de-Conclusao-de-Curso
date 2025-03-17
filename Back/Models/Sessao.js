import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    token:{
        type: String,
        required: true,
        unique: true,
    },
    dataCriacao: {
        type: Date,
        required: true,
    },
    dataExpiracao: {
        type: Date,
        required: true,
    },

});

export default mongoose.model('Sessao', Schema);