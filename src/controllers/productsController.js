const productsService = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const products = await productsService.getAllProducts();
  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProductById(id);
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

const insertSaledProduct = async (req, res) => {
  const saledProduct = req.body;
  const product = await productsService.insertSaledProduct(saledProduct);
  // if (product === undefined) {
  //   res.status(404).json({ message: 'Product not found' });
  // }
  res.status(201).json(product);
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  insertSaledProduct,
};
