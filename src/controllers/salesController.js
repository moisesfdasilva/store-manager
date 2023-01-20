const salesService = require('../services/salesService');

const getAllSales = async (_req, res) => {
  const sales = await salesService.getAllSales();
  res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  if (sale.message) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(sale);
};

const deleteSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.deleteSaleById(id);
  if (sale.message) {
    return res.status(404).json({ message: sale.message });
  }
  return res.status(204).json();
};

const updateSaledProduct = async (req, res) => {
  const { id } = req.params;
  const saledProducts = req.body;
  const products = await salesService.updateSaledProduct({ id, saledProducts });
  if (products.message) {
    return res.status(404).json({ message: products.message });
  }
  return res.status(200).json(products);
};

module.exports = {
  getAllSales,
  getSaleById,
  deleteSaleById,
  updateSaledProduct,
};
