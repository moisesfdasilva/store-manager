const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);
  if (product === undefined) {
    res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(product);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const product = await productsService.insertProduct(name);
  res.status(201).json(product);
};

module.exports = {
  getAll,
  getById,
  insertProduct,
};
