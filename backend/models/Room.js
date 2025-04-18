const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['disponivel', 'ocupado', 'manutencao'],
    default: 'disponivel',
  },
  observacoes: {
    type: String,
    default: '',
  },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Room', RoomSchema);
