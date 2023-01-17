const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
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
  getAll,
  getById,
  insertProduct,
  insertSaledProduct,
};
