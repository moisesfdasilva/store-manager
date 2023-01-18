const productsModel = require('../../models/productsModel');

const validateProductId = async (productId) => {
  const product = await productsModel.getProductById(productId);
  if (!product) { return { type: 'Product not found' }; }
  return { type: '' };
};

module.exports = {
  validateProductId,
};