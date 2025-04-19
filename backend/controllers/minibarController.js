const ProdutoMinibar = require('../models/ProdutoMinibar');

exports.getAllProdutos = async (req, res, next) => {
  try {
    const produtos = await ProdutoMinibar.findAll();
    res.json(produtos);
  } catch (error) {
    next(error);
  }
};

exports.getProdutoById = async (req, res, next) => {
  try {
    const produto = await ProdutoMinibar.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (error) {
    next(error);
  }
};

exports.createProduto = async (req, res, next) => {
  try {
    const newProduto = await ProdutoMinibar.create(req.body);
    res.status(201).json(newProduto);
  } catch (error) {
    next(error);
  }
};

exports.updateProduto = async (req, res, next) => {
  try {
    const produto = await ProdutoMinibar.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    await produto.update(req.body);
    res.json(produto);
  } catch (error) {
    next(error);
  }
};

exports.deleteProduto = async (req, res, next) => {
  try {
    const produto = await ProdutoMinibar.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    await produto.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
