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

const insertSale = async () => {
  const querry = 'INSERT INTO StoreManager.sales(date) VALUES(?)';
  const fullDateTimeNow = new Date();
  const convertedDateTimeNow = convertDateTime(fullDateTimeNow);
  const [newSale] = await connection.execute(querry, [convertedDateTimeNow]);

  return newSale;
};

const insertSaleProduct = async (saleId, { productId, quantity }) => {
  const tb = 'StoreManager.sales_products';
  const querry = `INSERT IGNORE INTO ${tb} (sale_id, product_id, quantity) VALUES(?, ?, ?)`;
  const newSalProd = await connection.execute(querry, [saleId, productId, quantity]);

  return newSalProd;
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  insertSale,
  insertSaleProduct,
};
