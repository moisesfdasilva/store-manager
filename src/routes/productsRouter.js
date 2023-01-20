const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

const nameProductAuthMiddware = require('../middlewares/nameProductAuthMiddware');

router.get('/products/search', productsController.searchProductName);
router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getProductById);
router.post('/products', nameProductAuthMiddware, productsController.insertProduct);
router.put('/products/:id', nameProductAuthMiddware, productsController.updateProductName);
router.delete('/products/:id', productsController.deleteProductById);

module.exports = router;