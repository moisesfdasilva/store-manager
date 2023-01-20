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

const updateProductName = async ({ name, id }) => {
  const verifyId = await validationsInputValues.validateProductId(id);
  if (verifyId.type) return { message: 'Product not found' };

  await productsModel.updateProductName({ name, id });
  
  return { id, name };
};

const deleteProductById = async (id) => {
  const verifyId = await validationsInputValues.validateProductId(id);
  if (verifyId.type) return { message: 'Product not found' };

  const deleteProduct = await productsModel.deleteProductById(id);
  
  return deleteProduct;
};

const searchProductName = async (searchProduct) => {
  const searchIncludes = `%${searchProduct}%`;
  const products = await productsModel.searchProductName(searchIncludes);
  return products;
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  insertSaledProduct,
  updateProductName,
  deleteProductById,
  searchProductName,
};
