import mongoose from "mongoose";

const statusMensagem = {
    "NF": "Nao Finalizada",
    "R": "Respondida",
    "NR": "Nao Respondida",
}

function getStatusMensagem(statusM){
    let result;
    switch(statusM){
        case "NF": 
            result = statusMensagem.NF;
            break

        case "R": 
            result = statusMensagem.R;
            break

        case "NR": 
            result = statusMensagem.NR;
            break
        default: 
            result = "";
            break;
    }
    return result;
}

const Schema = new mongoose.Schema({
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    conteudoMensagem: {
        type: String,
        required: true,
    },
    statusMensagem: {
        type: String, 
        required: true,
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

const model = mongoose.model('Mensagem', Schema);

export default {model, statusMensagem, getStatusMensagem}; 