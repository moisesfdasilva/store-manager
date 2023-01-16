const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);
  const notFound = { "message": "Product not found" };
  if (product === undefined) { res.status(404).json(notFound); };
  res.status(200).json(product);
};

module.exports = { getAll, getById };
