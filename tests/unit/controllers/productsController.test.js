const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const produtsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');
const {
  productsListMock,
  productIdMock,
  newProductMock,
} = require('./mocks/productsController.mock');

describe('1. Teste de unidade do productsController', function () {
  describe('1.1. Listando todos produtos', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(produtsService, 'getAllProducts')
        .resolves(productsListMock);

      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsListMock);
    });
  });

  describe('1.2. Busca um produto por id', function () {
    it('a. Deve retornar o status 200 com os dados do produto', async function () {
      const res = {};
      const req = {
        params: { id: 3 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(produtsService, 'getProductById')
        .resolves(productIdMock);

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productIdMock);

    });

    it('b. Deve retornar o status 404 com a mensagem "Product not found"', async function () {
      const res = {};
      const req = {
        params: { id: 777777 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(produtsService, 'getProductById')
        .resolves(undefined);

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('1.3. Cadastrando um produto', function () {
    it('Deve retornar o status 201 e uma chave com nome e id', async function () {
      const res = {};
      const req = {
        body: { name: 'ProdutoX' },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(produtsService, 'insertProduct')
        .resolves(newProductMock);

      await productsController.insertProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});