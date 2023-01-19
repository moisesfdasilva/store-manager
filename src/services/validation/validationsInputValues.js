const productsModel = require('../../models/productsModel');

const validateProductsId = async (saledProducts) => {
  const productsId = saledProducts.map(({ productId }) => (productId));
  const sqlArrayWithoutSpace = `(${productsId.toString()})`;
  const sqlArray = sqlArrayWithoutSpace.replaceAll(',', ', ');

  const findIds = await productsModel.getProductsByIds(sqlArray);
  const findIdsList = findIds.map((product) => (product.id));

  if (productsId.some((id) => !findIdsList.includes(id))) {
    return { type: 'err', message: 'Product not found' };
  }
  return { type: '', message: '' };
};

module.exports = {
  validateProductsId,
};