const FiscalDocumento = require('../models/FiscalDocumento');

exports.getAllDocumentos = async (req, res, next) => {
  try {
    const documentos = await FiscalDocumento.findAll();
    res.json(documentos);
  } catch (error) {
    next(error);
  }
};

exports.getDocumentoById = async (req, res, next) => {
  try {
    const documento = await FiscalDocumento.findByPk(req.params.id);
    if (!documento) {
      return res.status(404).json({ message: 'Documento fiscal não encontrado' });
    }
    res.json(documento);
  } catch (error) {
    next(error);
  }
};

exports.createDocumento = async (req, res, next) => {
  try {
    const newDocumento = await FiscalDocumento.create(req.body);
    res.status(201).json(newDocumento);
  } catch (error) {
    next(error);
  }
};

exports.updateDocumento = async (req, res, next) => {
  try {
    const documento = await FiscalDocumento.findByPk(req.params.id);
    if (!documento) {
      return res.status(404).json({ message: 'Documento fiscal não encontrado' });
    }
    await documento.update(req.body);
    res.json(documento);
  } catch (error) {
    next(error);
  }
};

exports.deleteDocumento = async (req, res, next) => {
  try {
    const documento = await FiscalDocumento.findByPk(req.params.id);
    if (!documento) {
      return res.status(404).json({ message: 'Documento fiscal não encontrado' });
    }
    await documento.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
