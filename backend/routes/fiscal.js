const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const fiscalController = require('../controllers/fiscalController');

// Generate fiscal document
router.post('/generate', auth(['admin', 'recepcionista']), fiscalController.generateFiscalDocument);

// Get fiscal documents list
router.get('/', auth(['admin', 'recepcionista', 'suporte']), fiscalController.getFiscalDocuments);

// Export fiscal document by id
router.get('/export/:id', auth(['admin', 'recepcionista', 'suporte']), fiscalController.exportFiscalDocument);

module.exports = router;
