const express = require('express');

const app = express();

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const nameProductAuthMiddware = require('./middlewares/nameProductAuthMiddware');
const salProdFieldsAuthMiddware = require('./middlewares/salProdFieldsAuthMiddware');

app.use(express.json());

app.get('/products', productsController.getAllProducts);
app.get('/products/:id', productsController.getProductById);
app.post('/products', nameProductAuthMiddware, productsController.insertProduct);
app.put('/products/:id', nameProductAuthMiddware, productsController.updateProductName);
app.delete('/products/:id', productsController.deleteProductById);

app.post('/sales', salProdFieldsAuthMiddware, productsController.insertSaledProduct);
app.get('/sales', salesController.getAllSales);
app.get('/sales/:id', salesController.getSaleById);
app.delete('/sales/:id', salesController.deleteSaleById);
app.put('/sales/:id', salProdFieldsAuthMiddware, salesController.updateSaledProduct);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
