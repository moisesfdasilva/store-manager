const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');
const validationsInputValues = require('../../../src/services/validation/validationsInputValues');

const {
  productsListMock,
  productIdMock,
  newProductMock,
  productUpIdMock,
} = require('./mocks/productsService.mock');

describe('2. Teste de unidade do productsService', function () {
  describe('2.1. Listando todos produtos', function () {
    it('Deve retornar a lista completa', async function () {
      sinon
        .stub(productsModel, 'getAllProducts')
        .resolves(productsListMock);

      const result = await productsService.getAllProducts();

      expect(result).to.deep.equal(productsListMock);
    });
  });

  describe('2.2. Busca um produto por id', function () {
    it('Deve retornar os dados do produto', async function () {
      sinon
        .stub(productsModel, 'getProductById')
        .resolves(productIdMock);

      const result = await productsService.getProductById(3);

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

  describe('2.4. Modificando um produto cadastrado com id válido', function () {
    it('Deve retornar um objeto com id e nome do produto', async function () {
      sinon
        .stub(validationsInputValues, 'validateProductId')
        .resolves({ type: '', message: '' });
      sinon
        .stub(productsModel, 'updateProductName')
        .resolves(productUpIdMock);

      const result = await productsService.updateProductName(productUpIdMock);

      expect(result).to.deep.equal(productUpIdMock);
    });

    it('Deve retornar um objeto com id e nome do produto', async function () {
      sinon
        .stub(validationsInputValues, 'validateProductId')
        .resolves({ type: 'err', message: 'Product not found' });

      const result = await productsService.updateProductName({ message: 'Product not found' });

      expect(result).to.deep.equal({ message: 'Product not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
