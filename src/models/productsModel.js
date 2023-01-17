const { connection } = require('./connection');
const convertDateTime = require('../helpers/convertDateTime');

const getAllProducts = async () => {
  const querry = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(querry);
  return products;
};

const getProductById = async (id) => {
  const querry = 'SELECT * FROM StoreManager.products WHERE id= ?';
  const [[product]] = await connection.execute(querry, [id]);
  return product;
};

const insertProduct = async (name) => {
  const querry = 'INSERT INTO StoreManager.products(name) VALUES(?)';
  const [newProduct] = await connection.execute(querry, [name]);
  return { id: newProduct.insertId, name };
};

const insertSaledProduct = async (saledProduct) => {
  const querrySales = 'INSERT INTO StoreManager.sales(date) VALUES(?)';
  const fullDateTimeNow = new Date();
  const convertedDateTimeNow = convertDateTime(fullDateTimeNow);
  const [newSale] = await connection.execute(querrySales, [convertedDateTimeNow]);

  const table = 'StoreManager.sales_products';
  const querrySalProd = `INSERT INTO ${table} (sale_id, product_id, quantity) VALUES(?, ?, ?)`;
  
  saledProduct.forEach(async ({ productId, quantity }) => {
    await connection.execute(querrySalProd, [newSale.insertId, productId, quantity]);
  });
  
  return { id: newSale.insertId, itemsSold: saledProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  insertSaledProduct,
};
