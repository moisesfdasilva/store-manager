const salesService = require('../services/salesService');

const getAllSales = async (_req, res) => {
  const products = await salesService.getAllSales();
  res.status(200).json(products);
};

module.exports = {
  getAllSales,
};
