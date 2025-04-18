const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const minibarController = require('../controllers/minibarController');

// Get all minibar products
router.get('/', auth(['admin', 'recepcionista', 'suporte']), minibarController.getAllProducts);

// Get product by id
router.get('/:id', auth(['admin', 'recepcionista', 'suporte']), minibarController.getProductById);

// Create new product
router.post('/', auth('admin'), minibarController.createProduct);

// Update product
router.put('/:id', auth('admin'), minibarController.updateProduct);

// Delete product
router.delete('/:id', auth('admin'), minibarController.deleteProduct);

// Record consumption for a room
router.post('/consume/:roomId/:productId', auth(['admin', 'recepcionista']), minibarController.consumeProduct);

module.exports = router;
