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
  const saledProducts = req.body;
  const products = await productsService.insertSaledProduct(saledProducts);
  if (products.message) {
    return res.status(404).json({ message: products.message });
  }
  res.status(201).json(products);
};

const updateProductName = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const products = await productsService.updateProductName({ name, id });
  if (products.message) {
    return res.status(404).json({ message: products.message });
  }
  res.status(200).json(products);
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  insertSaledProduct,
  updateProductName,
};
