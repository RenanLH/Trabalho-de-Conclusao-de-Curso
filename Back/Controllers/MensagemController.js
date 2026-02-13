import Mensagem from "../Models/Mensagem.js";
import Sessao from "../Models/Sessao.js";
import Usuario from "../Models/Usuario.js";

const statusMensagem = {
    "F": "Finalizada",
    "R": "Respondida",
    "NR": "Nao Respondida",
}

const role = {
    ADMIN:'admin',
    USER:'user',
}


async function createMensagem(req, res) {
  try {
    const { idUsuario, token, tituloMensagem, conteudoMensagem } = req.body;

    const validaUsuario = await Sessao.findOne({
      idUsuario,
      token
    });

    if (!validaUsuario)
      return res.status(404).send("Usuario nao encontrado");

    let statusMensagem = Mensagem.statusMensagem.NF;

    const mensagemNaoFinalizada = await Mensagem.findOne({
      idUsuario,
      statusMensagem
    });

    statusMensagem = Mensagem.statusMensagem.NR;

    const mensagemNaoRespondida = await Mensagem.findOne({
      idUsuario,
      statusMensagem
    });


    if (mensagemNaoRespondida || mensagemNaoFinalizada) {
      return res.status(400).send('Uma mensagem já foi enviada, espere até que seja respondida.');
    }

    statusMensagem = Mensagem.statusMensagem.NR;

    const dataEnvio = Date.now();

    let usuario = await Usuario.findById(idUsuario);
    const nomeUsuario = usuario.nomeUsuario;

    const createdMensagem = await Mensagem.create({
      idUsuario,
      conteudoMensagem,
      tituloMensagem,
      statusMensagem,
      nomeUsuario,
      dataEnvio
    })

    if (!createdMensagem) {
      return res.status(400).send("Erro ao enviar a mensagem");
    }

    return res.status(201).send(createdMensagem);

  } catch (error) {
    return res.status(400).send(error);
  }

}

async function awnserMensagem(req, res) {
  try {
    const { idUsuario, token, idMensagem, conteudoMensagem } = req.body;

    const validaUsuario = await Sessao.findOne({
      idUsuario,
      token
    });

    if (!validaUsuario)
      return res.status(404).send("Usuario não encontrado");

    let usuario = await Usuario.findById(idUsuario);

    const mensagem = await Mensagem.findById(idMensagem);

    if (usuario.role != role.ADMIN && mensagem.idUsuario.toString() != usuario._id.toString()) {
      return res.status(403).send("Forbidden Not admin");
    }

    const nomeUsuario = usuario.nomeUsuario;

    const dataEnvio = Date.now();
    const novaMensagem = await Mensagem.create({
      idUsuario,
      conteudoMensagem,
      idMensagem,
      nomeUsuario,
      dataEnvio
    })

    if (!novaMensagem) {
      return res.status(400).send("Erro ao enviar a mensagem");
    }

    novaMensagem.statusMensagem = usuario.role;
    console.log(novaMensagem);

    req.io.to(idMensagem).emit('nova_mensagem', novaMensagem);

    return res.status(201).send(novaMensagem);

  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }

}



async function getMensagemUsuario(req, res) {
  try {
    const { idUsuario } = req.params;

    const usuario = await Usuario.findById(idUsuario);


    if (!usuario)
      return res.status(404).send("Usuario nao encontrado");


    if (usuario.role === role.ADMIN) {
      const mensagens = await Mensagem.find({
        idMensagem: { $exists: false },
        tituloMensagem: { $exists: true }
      }
      );

      if (!mensagens || !mensagens.length)
        return res.status(404).send("Nenhuma mensagem encontrada");

      for (const mensage of mensagens) {
        let id = mensage.idUsuario.toString();

        let usuario = await Usuario.findById(id);

        if (usuario)
          mensage.nomeUsuario = usuario.nomeUsuario;

      }

      return res.status(200).send(mensagens);
    }

    const mensagens = await Mensagem.find({
      idUsuario,
      idMensagem: { $exists: false },
      tituloMensagem: { $exists: true }
    })
    if (!mensagens || !mensagens.length)
      return res.status(404).send("Nenhuma mensagem encontrada");

    for (const mensage of mensagens) {
      let id = mensage.idUsuario.toString();

      let usuario = await Usuario.findById(id);

      if (usuario)
        mensage.nomeUsuario = usuario.nomeUsuario;

    }

    return res.status(200).send(mensagens);

  } catch (error) {
    console.log(error);
    return res.status(400).send("error");
  }

}

async function getMensagemId(req, res) {
  try {
    const { idMensagem } = req.params;
    const { token } = req.body;

    const mensagem = await Mensagem.findById(idMensagem);

    if (!mensagem)
      return res.status(404).send("Mensagem nao encontrada");

    let id = mensagem.idUsuario.toString();

    let usuario = await Usuario.findById(id);

    let sessaoToken = await Sessao.findOne({ token })

    if (!sessaoToken) {
      return res.status(403).send("Forbidden ");
    }
    id = sessaoToken.idUsuario.toString();

    const usuarioToken = await Usuario.findById(id);

    if (!usuario || !usuarioToken) {
      return res.status(403).send("Forbidden");
    }

    if (usuario.id != usuarioToken.id) {
      if (usuarioToken.role != role.ADMIN) {
        return res.status(403).send("Forbidden Not Admin");
      }
    }

    mensagem.nomeUsuario = usuario.nomeUsuario;

    return res.status(200).send(mensagem);

  } catch (error) {
    return res.status(400).send("error");
  }

}

async function getRespostasId(req, res) {
  try {
    const { idMensagem } = req.params;
    const { token } = req.body;

    let sessaoToken = await Sessao.findOne({ token })

    if (!sessaoToken) {
      return res.status(401).send("Forbidden ");
    }

    let id = sessaoToken.idUsuario.toString();

    const usuarioToken = await Usuario.findById(id);
    let usuario = await Usuario.findById(id);

    if (!usuario || !usuarioToken) {
      return res.status(402).send("Forbidden ");
    }

    if (usuario.id != usuarioToken.id) {
      if (usuarioToken.role != role.ADMIN) {
        return res.status(403).send("Forbidden Not Admin");
      }
    }

    const mensagens = await Mensagem.find({ idMensagem });

    if (!mensagens)
      return res.status(404).send("Mensagem nao encontrada");

    for (const mensage of mensagens) {
      let id = mensage.idUsuario.toString();

      usuario = await Usuario.findById(id);

      if (usuario)
        mensage.nomeUsuario = usuario.nomeUsuario;

      mensage.id = undefined;
      mensage.idMensagem = undefined;
      mensage.idUsuario = undefined;
      mensage.statusMensagem = usuario.role;
    }


    return res.status(200).send(mensagens);

  } catch (error) {
    return res.status(400).send("error");
  }

}

async function getIndex(req, res) {
  try {
    let { statusMensagem } = req.params;

    console.log(statusMensagem);

    const mensagens = await Mensagem.find({
      statusMensagem,
    })

    if (!mensagens || !mensagens.length)
      return res.status(404).send("Nenhuma mensagem encontrada");

    for (const mensage of mensagens) {
      let id = mensage.idUsuario.toString();

      let usuario = await Usuario.findById(id);


      if (usuario)
        mensage.nomeUsuario = usuario.nomeUsuario;


      mensage.idUsuario = "";
    }

    return res.status(200).send(mensagens);

  } catch (error) {
    console.log(error);
    return res.status(400).send("error");
  }

}

async function finishMensagem(req, res){

  try {

    const { idUsuario, token, idMensagem } = req.body;

    const validaUsuario = await Sessao.findOne({
      idUsuario,
      token
    });

    if (!validaUsuario)
      return res.status(404).send("Usuario não encontrado");

    let usuario = await Usuario.findById(idUsuario);
    
    if (usuario.role != role.ADMIN) {
      return res.status(403).send("Forbidden Not admin");
    }

    
  } catch (error) {
    
  }


}

export default { createMensagem, getMensagemUsuario, getMensagemId, getIndex, awnserMensagem, getRespostasId };