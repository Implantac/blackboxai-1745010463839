const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const financialController = require('../controllers/financialController');

// Get all transactions
router.get('/transactions', auth(['admin', 'recepcionista', 'suporte']), financialController.getAllTransactions);

// Create new transaction
router.post('/transactions', auth(['admin', 'recepcionista']), financialController.createTransaction);

// Get cash flow summary
router.get('/cashflow', auth(['admin', 'recepcionista', 'suporte']), financialController.getCashFlow);

// TEF payment processing (stub)
router.post('/tef/payment', auth(['admin', 'recepcionista']), financialController.processTefPayment);

module.exports = router;
