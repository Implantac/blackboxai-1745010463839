const FiscalDocumento = require('../models/FiscalDocumento');

// Generate fiscal document (stub)
exports.generateFiscalDocument = async (req, res, next) => {
  try {
    const { tipoDocumento, dadosCupom } = req.body;
    // Here you would integrate with fiscal APIs or generate the document accordingly
    const fiscalDoc = new FiscalDocumento({ tipoDocumento, dadosCupom });
    await fiscalDoc.save();
    res.status(201).json(fiscalDoc);
  } catch (error) {
    next(error);
  }
};

// Get fiscal documents list
exports.getFiscalDocuments = async (req, res, next) => {
  try {
    const docs = await FiscalDocumento.find().sort({ dataEmissao: -1 });
    res.json(docs);
  } catch (error) {
    next(error);
  }
};

// Export fiscal document by id (stub)
exports.exportFiscalDocument = async (req, res, next) => {
  try {
    const doc = await FiscalDocumento.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ message: 'Documento fiscal não encontrado' });
    }
    // Stub: Return JSON, in real case generate PDF or XML for export
    res.json(doc);
  } catch (error) {
    next(error);
  }
};
