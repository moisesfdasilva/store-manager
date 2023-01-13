const productService = require('../services/productService');

const getAll = async (req, res) => {
  const products = await productService.getAll();
  res.status(200).json(products);
};

module.exports = { getAll };
