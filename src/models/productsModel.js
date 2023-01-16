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

module.exports = {
  getAll,
  getById,
  insertProduct,
};
