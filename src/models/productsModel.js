const { connection } = require('./connection');

const getAll = async () => {
  const querry = 'SELECT * FROM StoreManager.products';
  const products = await connection.execute(querry);
  return products;
};

module.exports = { getAll };
