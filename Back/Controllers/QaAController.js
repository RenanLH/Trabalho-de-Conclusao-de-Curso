import QaA from "../Models/QaA.js"

async function createPergunta(req, res) {

    const {pergunta, resposta} = req.body;

    try {
        const perguntaExiste = await QaA.findOne({
            pergunta,
            resposta,
        });

        if (perguntaExiste){
            return res.status(400).send({message: 'Pergunta ja esta cadastrada'});
        }

        const createdPergunta = await QaA.create({
            pergunta,
            resposta,
        });

        return res.status(201).send(createdPergunta);

    } catch (error) {
        return res.status(400).send('error');
    }
    
}

async function index(req, res) {

    try {

        const perguntasRespostas = await QaA.find();

        if (!perguntasRespostas || !perguntasRespostas.length ){

            return res.status(404).send("Nenhuma pergunta encontrada");
        }
        return res.status(200).send(perguntasRespostas);


    } catch (error) {
        return res.status(400).send('error');
    }
    
}


export default {createPergunta, index}