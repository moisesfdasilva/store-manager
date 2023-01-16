const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');

const {
  productsListMock,
  productIdMock,
} = require('./mocks/productsModel.mock');

describe('3. Teste de unidade do productsModel', function () {
  describe('3.1. Listando todos produtos', function () {
    it('Deve retornar a lista completa', async function () {
      sinon
        .stub(connection.execute)
        .resolves(productsListMock);
      
      const result = await productsModel.getAll();

      expect(result).to.deep.equal(productsListMock);
    });
  });

  describe('3.2. Busca um produto por id', function () {
    it('Deve retornar os dados do produto', async function () {
      sinon
        .stub(connection.execute)
        .resolves(productIdMock);

      const result = await productsModel.getById(3);

      expect(result).to.deep.equal(productIdMock);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
