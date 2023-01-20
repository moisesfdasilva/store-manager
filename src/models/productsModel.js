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

const getProductsByIds = async (sqlArray) => {
  const tb = 'StoreManager.products';
  const [products] = await connection
    .execute(`SELECT * FROM ${tb} WHERE id IN ${sqlArray}`);
  return products;
};

const insertSale = async () => {
  const querry = 'INSERT INTO StoreManager.sales(date) VALUES(?)';
  const fullDateTimeNow = new Date();
  const convertedDateTimeNow = convertDateTime(fullDateTimeNow);
  const [newSale] = await connection.execute(querry, [convertedDateTimeNow]);

  return newSale.insertId;
};

const insertSaleProducts = async ({ productSaleId, productId, quantity }) => {
  const qPt1 = 'INSERT IGNORE INTO StoreManager.sales_products(sale_id, product_id, quantity)';
  const qPt2 = 'VALUES (?, ?, ?)';

  const [newSalProd] = await connection
    .execute(`${qPt1} ${qPt2}`, [productSaleId, productId, quantity]);
  
  return newSalProd;
};

const updateProductName = async ({ name, id }) => {
  const querry = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const updateProduct = await connection.execute(querry, [name, id]);
  return updateProduct;
};

const deleteProductById = async (id) => {
  const querry = 'DELETE FROM StoreManager.products WHERE id = ?';
  const deleteProduct = await connection.execute(querry, [id]);
  return deleteProduct;
};

const searchProductName = async (searchIncludes) => {
  const qPt1 = 'SELECT * FROM StoreManager.products';
  const qPt2 = 'WHERE name LIKE ?';

  const querry = `${qPt1} ${qPt2}`;
  const [product] = await connection.execute(querry, [searchIncludes]);

  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  getProductsByIds,
  insertSale,
  insertSaleProducts,
  updateProductName,
  deleteProductById,
  searchProductName,
};
