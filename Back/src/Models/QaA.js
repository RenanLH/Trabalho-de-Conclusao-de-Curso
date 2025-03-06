import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    pergunta: {
        type: String,
        required: true,
    },
    resposta: {
        type: String,
        required: true,
    },

})

export default mongoose.model('QaA', Schema); 