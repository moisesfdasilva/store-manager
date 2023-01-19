const salesModel = require('../models/salesModel');
const validationsInputValues = require('./validation/validationsInputValues');

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

module.exports = {
  getAllSales,
  getSaleById,
};