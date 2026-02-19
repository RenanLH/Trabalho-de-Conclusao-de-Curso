import { Router } from "express";
import UsuarioController from "../Controllers/UsuarioController.js";
import QaAController from "../Controllers/QaAController.js";
import TopicoController from "../Controllers/TopicoController.js";
import MensagemController from "../Controllers/MensagemController.js";
import RespostaController from "../Controllers/RespostaController.js";
import SessaoController from "../Controllers/SessaoController.js";

const routes = Router();

routes.post('/api/usuarios', UsuarioController.createUsuario);
routes.get('/api/usuarios/index', UsuarioController.getIndexUsuario);
routes.post('/api/usuarios/get', UsuarioController.getUsuario);

routes.post('/api/sessao/', SessaoController.createSessao);
routes.get('/api/sessao/', SessaoController.getSessao);

routes.post('/api/duvidas', QaAController.createPergunta);
routes.post('/api/duvidas/update', QaAController.updatePergunta);
routes.post('/api/duvidas/delete', QaAController.deletePergunta);
routes.get('/api/duvidas', QaAController.index);

routes.get('/api/topico/:idTopico', TopicoController.getTopico);
routes.get('/api/forum/buscar/:query', TopicoController.search);
routes.post('/api/forum', TopicoController.createTopico);
routes.get('/api/forum', TopicoController.index);

routes.post('/api/mensagens', MensagemController.createMensagem);
routes.get('/api/mensagens/usuario/:idUsuario', MensagemController.getMensagemUsuario);
routes.post('/api/mensagens/id/:idMensagem', MensagemController.getMensagemId);
routes.get('/api/mensagens/index/:statusMensagem', MensagemController.getIndex);
routes.post('/api/mensagens/responder/', MensagemController.awnserMensagem);
routes.post('/api/mensagens/respostas/:idMensagem', MensagemController.getRespostasId);

routes.post('/api/topico/respostas/:idTopico', RespostaController.createRespostaTopico);
routes.post('/api/respostas/responder/:idResposta', RespostaController.createResposta);
routes.get('/api/topico/respostas/:idTopico', RespostaController.getRespostasTopico);
routes.get('/api/respostas/:idResposta', RespostaController.getRespostas);


export default routes;