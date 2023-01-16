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

module.exports = { getAll, getById };
