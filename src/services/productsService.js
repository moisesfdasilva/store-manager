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
  const verifyIds = await validationsInputValues.validateProductsId(saledProducts);
  if (verifyIds.type) return { message: 'Product not found' };

  const productSaleId = await productsModel.insertSale();

  const saledProductsPromises = saledProducts.map(({ productId, quantity }) => (
    productsModel.insertSaleProducts({ productSaleId, productId, quantity })
  ));

  await Promise.all(saledProductsPromises);

  const result = { id: productSaleId, itemsSold: saledProducts };

  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  insertSaledProduct,
};
