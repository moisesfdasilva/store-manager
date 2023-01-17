const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  return product;
};

const insertProduct = async (name) => {
  const product = await productsModel.insertProduct(name);
  return product;
};

const insertSaledProduct = async (saledProduct) => {
  const product = await productsModel.insertSaledProduct(saledProduct);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  insertSaledProduct,
};
