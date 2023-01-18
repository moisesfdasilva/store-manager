const productsModel = require('../models/productsModel');
const validationsInputValues = require('./validation/validationsInputValues');

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

const insertSaledProduct = async (saledProducts) => {
  const errorsProductIdProm = saledProducts.map(({ productId }) => {
    const product = validationsInputValues.validateProductId(productId);
    return product;
  });
  const errorsProductId = await Promise.all(errorsProductIdProm);
  
  if (errorsProductId.some(({ type }) => type === 'Product not found')) {
    return { message: 'Product not found' };
  }

  // se o id existe cadastra
  // const insertedSale = await productsModel.insertSale();
  // const saledProductsPromises = saledProducts.map((product) => (
  //   productsModel.insertSaleProduct(insertedSale.insertId, product)
  // ));

  // const aaa = await Promise.all(saledProductsPromises);

  // const result = { id: insertedSale.insertId, itemsSold: saledProduct }

  return 'aaa';
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  insertSaledProduct,
};
