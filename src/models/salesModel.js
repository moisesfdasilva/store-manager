const { connection } = require('./connection');

const getAllSales = async () => {
  const qPt1 = 'SELECT sale_id AS saleId, date, product_id AS productId, quantity';
  const qPt2 = 'FROM StoreManager.sales_products AS pro';
  const qPt3 = 'INNER JOIN StoreManager.sales AS sal';
  const qPt4 = 'ON pro.sale_id = sal.id';

  const querry = `${qPt1} ${qPt2} ${qPt3} ${qPt4}`;
  const [sales] = await connection.execute(querry);
  return sales;
};

const getSaleById = async (id) => {
  const querry = 'SELECT * FROM StoreManager.sales_products WHERE sale_id= ?';
  const [[sale]] = await connection.execute(querry, [id]);
  return sale;
};

const getSaleWhithProducById = async (saleId) => {
  const qPt1 = 'SELECT date, product_id AS productId, quantity';
  const qPt2 = 'FROM StoreManager.sales_products AS pro';
  const qPt3 = 'INNER JOIN StoreManager.sales AS sal';
  const qPt4 = 'ON pro.sale_id = sal.id';
  const qPt5 = 'WHERE sale_id= ?';

  const querry = `${qPt1} ${qPt2} ${qPt3} ${qPt4} ${qPt5}`;
  const [sale] = await connection.execute(querry, [saleId]);
  return sale;
};

const deleteSaleById = async (id) => {
  const querry = 'DELETE FROM StoreManager.sales WHERE id = ?';
  const deleteSale = await connection.execute(querry, [id]);
  return deleteSale;
};

const updateSaledProduct = async ({ id, productId, quantity }) => {
  const qPt1 = 'UPDATE StoreManager.sales_products';
  const qPt2 = 'SET quantity = ?';
  const qPt3 = 'WHERE sale_id = ? AND product_id = ?';
  
  const querry = `${qPt1} ${qPt2} ${qPt3}`;
  const [updateProduct] = await connection.execute(querry, [quantity, id, productId]);

  return updateProduct;
};

module.exports = {
  getAllSales,
  getSaleById,
  getSaleWhithProducById,
  deleteSaleById,
  updateSaledProduct,
};
