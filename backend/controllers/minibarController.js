const ProdutoMinibar = require('../models/ProdutoMinibar');
const Room = require('../models/Room');

// Get all minibar products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await ProdutoMinibar.find().sort({ nome: 1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// Get product by id
exports.getProductById = async (req, res, next) => {
  try {
    const product = await ProdutoMinibar.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Create new product
exports.createProduct = async (req, res, next) => {
  try {
    const { nome, quantidade, preco, alertaReposicao } = req.body;
    const product = new ProdutoMinibar({ nome, quantidade, preco, alertaReposicao });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Update product
exports.updateProduct = async (req, res, next) => {
  try {
    const { nome, quantidade, preco, alertaReposicao } = req.body;
    const product = await ProdutoMinibar.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    product.nome = nome || product.nome;
    product.quantidade = quantidade !== undefined ? quantidade : product.quantidade;
    product.preco = preco || product.preco;
    product.alertaReposicao = alertaReposicao !== undefined ? alertaReposicao : product.alertaReposicao;
    await product.save();
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await ProdutoMinibar.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    await product.remove();
    res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    next(error);
  }
};

// Record consumption for a room
exports.consumeProduct = async (req, res, next) => {
  try {
    const { roomId, productId } = req.params;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Quarto não encontrado' });
    }
    const product = await ProdutoMinibar.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    if (product.quantidade <= 0) {
      return res.status(400).json({ message: 'Produto fora de estoque' });
    }
    product.quantidade -= 1;
    await product.save();

    // TODO: Add consumption record per room if needed

    // Emit update to clients
    req.io.emit('minibarUpdated', { roomId, productId, quantidade: product.quantidade });

    res.json({ message: 'Consumo registrado com sucesso', product });
  } catch (error) {
    next(error);
  }
};
