const mongoose = require('mongoose');

const FiscalDocumentoSchema = new mongoose.Schema({
  tipoDocumento: {
    type: String,
    enum: ['NFC-e', 'SAT', 'CF-e'],
    required: true,
  },
  dadosCupom: {
    type: Object,
    required: true,
  },
  arquivoExportado: {
    type: String,
    default: '',
  },
  dataEmissao: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('FiscalDocumento', FiscalDocumentoSchema);
