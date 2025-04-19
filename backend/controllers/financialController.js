const Transacao = require('../models/Transacao');

exports.getAllTransacoes = async (req, res, next) => {
  try {
    const transacoes = await Transacao.findAll();
    res.json(transacoes);
  } catch (error) {
    next(error);
  }
};

exports.getTransacaoById = async (req, res, next) => {
  try {
    const transacao = await Transacao.findByPk(req.params.id);
    if (!transacao) {
      return res.status(404).json({ message: 'Transação não encontrada' });
    }
    res.json(transacao);
  } catch (error) {
    next(error);
  }
};

exports.createTransacao = async (req, res, next) => {
  try {
    const newTransacao = await Transacao.create(req.body);
    res.status(201).json(newTransacao);
  } catch (error) {
    next(error);
  }
};

exports.updateTransacao = async (req, res, next) => {
  try {
    const transacao = await Transacao.findByPk(req.params.id);
    if (!transacao) {
      return res.status(404).json({ message: 'Transação não encontrada' });
    }
    await transacao.update(req.body);
    res.json(transacao);
  } catch (error) {
    next(error);
  }
};

exports.deleteTransacao = async (req, res, next) => {
  try {
    const transacao = await Transacao.findByPk(req.params.id);
    if (!transacao) {
      return res.status(404).json({ message: 'Transação não encontrada' });
    }
    await transacao.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
