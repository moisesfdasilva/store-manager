const { connection } = require('./connection');

const getAll = async () => {
  const querry = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(querry);
  return products;
};

const getById = async (id) => {
  const querry = 'SELECT * FROM StoreManager.products WHERE id= ?';
  const [[product]] = await connection.execute(querry, [id]);
  return product;
};

const insertProduct = async (name) => {
  const querry = 'INSERT INTO StoreManager.products (name) VALUES(?)';
  const [newProduct] = await connection.execute(querry, [name]);
  return { id: newProduct.insertId, name };
};

const insertSaledProduct = async (saledProduct) => {
  // StoreManager.sales                insere now()
  // StoreManager.sales_products       insere dado
  const querry = 'INSERT INTO StoreManager.products (product_id, quantity) VALUES(?, ?)';
  const [newProduct] = await connection.execute(querry, [saledProduct]);
  return { id: newProduct.insertId, saledProduct };
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  insertSaledProduct,
};
