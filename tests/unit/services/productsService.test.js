const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');

const {
  productsListMock,
  productIdMock,
  newProductMock,
} = require('./mocks/productsService.mock');

describe('2. Teste de unidade do productsService', function () {
  describe('2.1. Listando todos produtos', function () {
    it('Deve retornar a lista completa', async function () {
      sinon
        .stub(productsModel, 'getAll')
        .resolves(productsListMock);

      const result = await productsService.getAll();

      expect(result).to.deep.equal(productsListMock);
    });
  });

  describe('2.2. Busca um produto por id', function () {
    it('Deve retornar os dados do produto', async function () {
      sinon
        .stub(productsModel, 'getById')
        .resolves(productIdMock);

      const result = await productsService.getById(3);

      expect(result).to.deep.equal(productIdMock);
    });
  });

  describe('2.3. Cadastra um produto com valor válido', function () {
    it('Deve retornar um objeto com id e nome do produto', async function () {
      sinon
        .stub(productsModel, 'insertProduct')
        .resolves(newProductMock);

      const result = await productsService.insertProduct('ProdutoX');

      expect(result).to.deep.equal(newProductMock);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
