const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { connection } = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');

const {
  productsListMock,
  productIdMock,
  newProductMock,
  productUpIdMock,
} = require('./mocks/productsModel.mock');

describe('3. Teste de unidade do productsModel', function () {
  describe('3.1. Listando todos produtos', function () {
    it('Deve retornar a lista completa', async function () {
      sinon
        .stub(connection, 'execute')
        .resolves([productsListMock]);
      
      const result = await productsModel.getAllProducts();

      expect(result).to.deep.equal(productsListMock);
    });
  });

  describe('3.2. Busca um produto por id', function () {
    it('Deve retornar os dados do produto', async function () {
      sinon
        .stub(connection, 'execute')
        .resolves([[productIdMock]]);

      const result = await productsModel.getProductById(3);

      expect(result).to.deep.equal(productIdMock);
    });
  });

  describe('3.3. Cadastrando um produto', function () {
    it('Deve retornar um objeto com id e nome do produto', async function () {
      sinon
        .stub(connection, 'execute')
        .resolves([{ insertId: 4 }]);

      const result = await productsModel.insertProduct('ProdutoX');
      expect(result).to.deep.equal(newProductMock);
    });
  });

  describe('3.4. Modificando um produto', function () {
    it('Deve retornar um objeto com id e nome do produto', async function () {
      sinon
        .stub(connection, 'execute')
        .resolves([{ affectedRows: 1 }]);
      
      const result = await productsModel.updateProductName(productUpIdMock);

      expect(result).to.deep.equal(1);
    });
  });

  describe('3.5. Deletando um produto', function () {
    it('Deve retornar um objeto com id e nome do produto', async function () {
      sinon
        .stub(connection, 'execute')
        .resolves([{ affectedRows: 1 }]);

      const result = await productsModel.deleteProductById(1);

      expect(result).to.deep.equal(1);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
