const mongoose = require('mongoose');

const ProdutoMinibarSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
    default: 0,
  },
  preco: {
    type: Number,
    required: true,
  },
  alertaReposicao: {
    type: Number,
    default: 5,
  },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ProdutoMinibar', ProdutoMinibarSchema);
