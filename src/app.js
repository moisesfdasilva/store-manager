const express = require('express');

const app = express();

const productsController = require('./controllers/productsController');
const nameProductAuthMiddware = require('./middlewares/nameProductAuthMiddware');

app.use(express.json());

app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getById);
app.post('/products', nameProductAuthMiddware, productsController.insertProduct);
app.post('/sales', productsController.insertSaledProduct);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
