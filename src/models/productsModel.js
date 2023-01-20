const { connection } = require('./connection');

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

const updateProductName = async ({ name, id }) => {
  const querry = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const [updateProduct] = await connection.execute(querry, [name, id]);
  return updateProduct.affectedRows;
};

const deleteProductById = async (id) => {
  const querry = 'DELETE FROM StoreManager.products WHERE id = ?';
  const [deleteProduct] = await connection.execute(querry, [id]);
  return deleteProduct.affectedRows;
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
  updateProductName,
  deleteProductById,
  searchProductName,
};
