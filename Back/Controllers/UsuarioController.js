import Usuario from "../Models/Usuario.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import Sessao from "../Models/Sessao.js";

async function hashPass(senha) {
  try {
    const salt = await bcrypt.genSalt(10);
    const encriptPass = await bcrypt.hash(senha, salt);
    return encriptPass;
  } catch (error) {
    return null;
  }
}

async function createUsuario(req, res) {
  try {
    const { email, senha, nomeUsuario } = req.body;

    if (!email || !senha || !nomeUsuario
      || String(email).trim().length < 5
      || String(senha).trim().length < 5
      || String(nomeUsuario).trim().length < 5)

      return res.status(400).send('Dados Inválidos');

    const usuarioExistente = await Usuario.Model.findOne({
      email
    });

    if (usuarioExistente) {
      return res.status(400).send('Email já esta cadastrado');
    }

    const hashedPass = await hashPass(senha);

    if (!hashedPass) {
      return res.status(500).send("Erro do servidor");
    }

    const createdUsuario = await Usuario.Model.create({
      email,
      senha: hashedPass,
      nomeUsuario,
      role: Usuario.role.USER
    })

    if (!createdUsuario) {
      return res.status(401).send("Erro ao criar o usuario");
    }

    const idUsuario = createdUsuario._id;
    const token = crypto.randomBytes(16).toString('hex');

    const dataCriacao = new Date(Date.now());

    const dataExpiracao = new Date(dataCriacao);
    dataExpiracao.setDate(dataCriacao.getDate() + 7);

    const createdSessao = await Sessao.create({
      idUsuario,
      token,
      dataCriacao,
      nomeUsuario,
      dataExpiracao
    });

    return res.status(201).send(createdSessao);

  } catch (error) {
      return res.status(500).send("erro do servidor")
  }

}

async function getUsuario(req, res) {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.Model.findOne({ email });

    if (!usuario || !await bcrypt.compare(senha, usuario.senha))
      return res.status(404).send("senha incorreta");

    return res.status(200).send(usuario);

  } catch (error) {
      return res.status(500).send("erro do servidor")
  }

}

async function getIndexUsuario(req, res) {
  try {

    const usuario = await Usuario.Model.find();

    if (!usuario || !usuario.length)
      return res.status(404).send("Nenhum usuario encontrado");

    return res.status(200).send(usuario);

  } catch (error) {
    return res.status(500).send("erro do servidor")
  }

}
export default { createUsuario, getUsuario, getIndexUsuario };