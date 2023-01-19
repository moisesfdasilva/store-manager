const salesModel = require('../models/salesModel');

const getAllSales = async () => {
  const products = await salesModel.getAllSales();
  return products;
};

module.exports = {
  getAllSales,
};