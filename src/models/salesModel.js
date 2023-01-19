const { connection } = require('./connection');

const getAllSales = async () => {
  const qPt1 = 'SELECT sale_id AS saleId, date, product_id AS productId, quantity';
  const qPt2 = 'FROM StoreManager.sales_products AS pro';
  const qPt3 = 'INNER JOIN StoreManager.sales AS sal';
  const qPt4 = 'ON pro.sale_id = sal.id';

  const querry = `${qPt1} ${qPt2} ${qPt3} ${qPt4}`;
  const [products] = await connection.execute(querry);
  return products;
};

module.exports = {
  getAllSales,
};
