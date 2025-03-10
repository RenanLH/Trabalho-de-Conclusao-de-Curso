import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
    },
    nomeUsuario: {
        type: String, 
        required: true,        
    },

})

export default mongoose.model('Usuario', Schema); 