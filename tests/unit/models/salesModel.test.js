const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { connection } = require('../../../src/models/connection');
const salesModel = require('../../../src/models/salesModel');

describe('6. Teste de unidade do salesModel', function () {
  describe('6.1. Cadastra uma venda', function () {
    it('Deve retornar o id da nova venda', async function () {
      sinon
        .stub(connection, 'execute')
        .resolves([{ insertId: 5 }]);

      const result = await salesModel.insertSale();

      expect(result).to.deep.equal(5);
    });
  });
  describe('6.2. Cadastra os produtos de uma venda', function () {
    it('Deve retornar o id da nova venda', async function () {
      sinon
        .stub(connection, 'execute')
        .resolves([{ productId: 77, quantity: 777 }]);

      const result = await salesModel.insertSaleProducts({
        productSaleId: 7,
        productId: 77,
        quantity: 777,
      });

      expect(result).to.deep.equal({ productId: 77, quantity: 777 });
    });
  });

  describe('6.3. Listando todos produtos', function () {
    it('Deve retornar a lista completa', async function () {
      sinon
        .stub(connection, 'execute')
        .resolves([[
          { saleId: 1, date: '2023-01-01T07:07:07.777Z', 'productId': 7, 'quantity': 7 },
          { saleId: 2, date: '2023-01-02T07:07:07.777Z', 'productId': 7, 'quantity': 7 },
          { saleId: 3, date: '2023-01-03T07:07:07.777Z', 'productId': 7, 'quantity': 7 },
        ]]);

      const result = await salesModel.getAllSales();

      expect(result).to.deep.equal([
        { saleId: 1, date: '2023-01-01T07:07:07.777Z', productId: 7, quantity: 7 },
        { saleId: 2, date: '2023-01-02T07:07:07.777Z', productId: 7, quantity: 7 },
        { saleId: 3, date: '2023-01-03T07:07:07.777Z', productId: 7, quantity: 7 },
      ]);
    });
  });

  describe('6.4. Busca uma venda por id', function () {
    it('Deve retornar o id e data da venda', async function () {
      sinon
        .stub(connection, 'execute')
        .resolves([[{ id: 3, date: '2023-01-03T07:07:07.777Z' }]]);

      const result = await salesModel.getSaleById(3);

      expect(result).to.deep.equal({ id: 3, date: '2023-01-03T07:07:07.777Z' });
    });
  });

  describe('6.5. Busca uma venda por id', function () {
    it('Deve retornar a data da venda com os dados dos produtos', async function () {
      sinon
        .stub(connection, 'execute')
        .resolves([
          { date: '2023-01-03T07:07:07.777Z', productId: 7, quantity: 7 },
        ]);

      const result = await salesModel.getSaleWhithProducById(3);

      expect(result).to.deep.equal(
        { date: '2023-01-03T07:07:07.777Z', productId: 7, quantity: 7 },
      );
    });
  });

  describe('6.6. Deletando uma venda por id', function () {
    it('Deve retornar a quantidade de vendas deletadas', async function () {
      sinon
        .stub(connection, 'execute')
        .resolves([{ affectedRows: 1 }]);

      const result = await salesModel.deleteSaleById(4);

      expect(result).to.deep.equal(1);
    });
  });

  describe('6.7. Modificando uma venda por id', function () {
    it('Deve retornar a quantidade de vendas modificadas', async function () {
      sinon
        .stub(connection, 'execute')
        .resolves([{affectedRows: 1}]);

      const result = await salesModel.updateSaledProduct(4);

      expect(result).to.deep.equal(1);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});