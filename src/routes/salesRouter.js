const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');

const salProdFieldsAuthMiddware = require('../middlewares/salProdFieldsAuthMiddware');

router.post('/sales', salProdFieldsAuthMiddware, salesController.insertSaledProduct);
router.get('/sales', salesController.getAllSales);
router.get('/sales/:id', salesController.getSaleById);
router.delete('/sales/:id', salesController.deleteSaleById);
router.put('/sales/:id', salProdFieldsAuthMiddware, salesController.updateSaledProduct);

module.exports = router;