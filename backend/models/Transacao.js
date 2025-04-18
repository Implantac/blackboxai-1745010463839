const mongoose = require('mongoose');

const TransacaoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ['entrada', 'saida'],
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
  descricao: {
    type: String,
    default: '',
  },
  metodoPagamento: {
    type: String,
    enum: ['dinheiro', 'cartao', 'pix', 'outro'],
    default: 'dinheiro',
  },
  referenciaTEF: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Transacao', TransacaoSchema);
