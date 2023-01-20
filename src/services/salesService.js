const salesModel = require('../models/salesModel');
const validationsInputValues = require('./validation/validationsInputValues');

const insertSaledProduct = async (saledProducts) => {
  const verifyIds = await validationsInputValues.validateProductsId(saledProducts);
  if (verifyIds.type) return { message: 'Product not found' };

  const productSaleId = await salesModel.insertSale();

  const saledProductsPromises = saledProducts.map(({ productId, quantity }) => (
    salesModel.insertSaleProducts({ productSaleId, productId, quantity })
  ));

  await Promise.all(saledProductsPromises);

  const result = { id: productSaleId, itemsSold: saledProducts };

  return result;
};

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getSaleById = async (saleId) => {
  const verifyId = await validationsInputValues.validateSaleId(saleId);
  if (verifyId.type) return { message: 'Sale not found' };

  const sale = await salesModel.getSaleWhithProducById(saleId);

  return sale;
};

const deleteSaleById = async (id) => {
  const verifyId = await validationsInputValues.validateSaleId(id);
  if (verifyId.type) return { message: 'Sale not found' };

  const deleteSale = await salesModel.deleteSaleById(id);

  return deleteSale;
};

const updateSaledProduct = async ({ id, saledProducts }) => {
  const verifyProdIds = await validationsInputValues.validateProductsId(saledProducts);
  if (verifyProdIds.type) return { message: 'Product not found' };

  const verifySalId = await validationsInputValues.validateSaleId(id);
  if (verifySalId.type) return { message: 'Sale not found' };

  const saledProductsPromises = saledProducts.map(({ productId, quantity }) => (
    salesModel.updateSaledProduct({ id, productId, quantity })
  ));

  await Promise.all(saledProductsPromises);

  const result = { saleId: id, itemsUpdated: saledProducts };

  return result;
};

module.exports = {
  insertSaledProduct,
  getAllSales,
  getSaleById,
  deleteSaleById,
  updateSaledProduct,
};