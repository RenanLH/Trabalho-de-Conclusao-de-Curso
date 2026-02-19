import mongoose from "mongoose";

const role = {
  ADMIN: 'admin',
  USER: 'user',
}

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
    role: {
        type: String,
        required: true,
    },

})

const Model = mongoose.model('Usuario', Schema);

export default {Model, role}; 