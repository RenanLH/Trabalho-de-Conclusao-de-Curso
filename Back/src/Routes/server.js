import { Router } from "express";
import UsuarioController from "../Controllers/UsuarioController.js";
import QaAController from "../Controllers/QaAController.js";
import TopicoController from "../Controllers/TopicoController.js";
import MensagemController from "../Controllers/MensagemController.js";
import RespostaController from "../Controllers/RespostaController.js";
import SessaoController from "../Controllers/SessaoController.js";

const routes = Router();

routes.post('/usuarios', UsuarioController.createUsuario);
routes.get('/usuarios/index', UsuarioController.getIndexUsuario);
routes.get('/usuarios/', UsuarioController.getUsuario);

routes.post('/sessao/', SessaoController.createSessao);
routes.get('/sessao/', SessaoController.getSessao);

routes.post('/duvidas', QaAController.createPergunta);
routes.get('/duvidas', QaAController.index);

routes.get('/topicos/:idTopico', TopicoController.getTopico);
routes.get('/topicos/:idTopico', TopicoController.getTopico);

routes.post('/mensagens', MensagemController.createMensagem);
routes.get('/mensagens/usuario/:idUsuario', MensagemController.getMensagemUsuario);
routes.get('/mensagens/id/:idMensagem', MensagemController.getMensagemId);
routes.get('/mensagens/index/:statusMensagem', MensagemController.getIndex);

routes.post('/respostas/mensagem/', RespostaController.createResposta);
routes.post('/respostas/idResposta/:idResposta', RespostaController.createResposta);
routes.get('/respostas/mensagem/:idMensagem', RespostaController.getRespostas);

/*routes.get("/topicos/:tid", async(req, res) => {
    try {
        const id = req.params.tid;
        let data;
        if (id == 1 || id == "1"){
            data = {
                'idTopico': 1,
                'title':'O Caminho da Adaptação: Desafios da Migração Internacional',
                'user':'@Anonimo',
                'text': 'Como migrante em um novo país, enfrento uma série de desafios que impactam minha adaptação e bem-estar',
            } 
        }

        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json(`error ${error}`);
    }

});*/

routes.get("/topicos", async(req, res) => {
    try {
        const topicos = [{
            'idTopico': 1,
            'title':'O Caminho da Adaptação: Desafios da Migração Internacional',
            'user':'Como migrante em um novo país, enfrento uma série de desafios que impactam minha adaptação e bem-estar',
            'text': '@Anonimo' 
        },
        {
            'idTopico': 2,
            'title':'Trabalhando Além das Fronteiras: Desafios na Adaptação Profissional',
            'user':'@Anonimo',
            'text': 'Encontrar emprego compatível com minhas habilidades e experiência é uma tarefa difícil devido às barreiras linguísticas e culturais.' 
        },
        {
            'idTopico': 3,
            'title':'Imigração em Perspectiva: Lidando com a Complexidade dos Vistos e Status Legal',
            'user':'@Anonimo',
            'text': 'Além disso, lidar com questões de visto e imigração pode ser complexo e burocrático, causando ansiedade e incerteza em relação ao meu status legal.' 
        },

    ];
    res.status(200).json(topicos);

    } catch (error) {
        console.log(error);
        res.status(500).json(`error ${error}`);
    }
});
/*
routes.get("/duvidas", async(req, res )=> {
    try {
        const duvidas = [{
            'questionPT': 'Como obter uma autorização de Residência para fins laborais?',
            'awnserPT':'Todas as informações podem ser encontradas em: https://portaldeimigracao.mj.gov.br/pt/destaques-e-novidades/401563#_Toc115443161',
            'questionES': 'Cómo obtener una autorización de residencia para fines laborales?',
            'awnserES': 'Para obtener un visado de residencia en Brasil, debes acudir al consulado o embajada brasileña en tu país de origen antes de viajar. Después de llegar a Brasil, debes registrarte en la Policía Federal dentro de los 30 días', 
            'questionEN': 'How to obtain a residence permit for work purposes?',
            'awnserEN': '', 
        },
        {
            'questionPT': 'Preciso de visto para trabalhar no Brasil?',
            'awnserPT':'Sim, para trabalhar legalmente no Brasil, você precisará de um visto de trabalho. O seu empregador deve solicitar uma autorização de trabalho junto ao Ministério do Trabalho e Emprego (MTE), e você deve solicitar o visto junto ao consulado brasileiro.',
            'questionES': '¿Necesito visado para trabajar en Brasil?',
            'awnserES': 'Sí, para trabajar legalmente en Brasil, necesitarás un visado de trabajo. Tu empleador debe solicitar una autorización de trabajo ante el Ministerio de Trabajo y Empleo (MTE), y tú debes solicitar el visado en el consulado brasileño.', 
            'questionEN': '',
            'awnserEN': '',
        },
        {
            'questionPT': 'Quais são os documentos necessários para viver no Brasil?',
            'awnserPT':'Os documentos básicos incluem o passaporte válido, visto apropriado, Certidão de Nascimento, Certificado de Antecedentes Criminais, e registro na Polícia Federal (RNE - Registro Nacional de Estrangeiros). Alguns documentos precisam ser traduzidos e autenticados.',
            'questionES': '¿Cuáles son los documentos necesarios para vivir en Brasil?',
            'awnserES': 'Los documentos básicos incluyen el pasaporte válido, visado apropiado, Certificado de Nacimiento, Certificado de Antecedentes Penales y registro en la Policía Federal (RNE - Registro Nacional de Extranjeros). Algunos documentos necesitan ser traducidos y autenticados.', 
            'questionEN': '',
            'awnserEN': '',
        },
     ]
     res.status(200).json(duvidas);
    } catch (error) {
        console.log(error);
        res.status(500).json(`error:  ${error}`);
    }
});*/

export default routes;