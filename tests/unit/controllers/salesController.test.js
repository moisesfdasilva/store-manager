const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');
const {
  registeredSaleMock,
  allSalesMock,
  salesByIdMock,
  updateSaleMock,
} = require('./mocks/salesController.mock');

describe('4. Teste de unidade do salesController', function () {
  describe('4.1. Cadastra a venda', function () {
    it('a. Se os campos são válidos retorna o status 200 e a venda', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'insertSaledProduct')
        .resolves(registeredSaleMock);

      await salesController.insertSaledProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(registeredSaleMock);
    });

    it('b. Se os campos não são válidos retorna o status 404 e o erro', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'insertSaledProduct')
        .resolves({ message: 'Product not found' });

      await salesController.insertSaledProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('4.2. Listando todas as vendas', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'getAllSales')
        .resolves(allSalesMock);

      await salesController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSalesMock);
    });
  });

  describe('4.3. Busca uma venda por id', function () {
    it('a. Deve retornar o status 200 com os dados da venda', async function () {
      const res = {};
      const req = {
        params: { id: 3 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'getSaleById')
        .resolves(salesByIdMock);

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesByIdMock);
    });

    it('b. Deve retornar o status 404 com mensagem de erro', async function () {
      const res = {};
      const req = {
        params: { id: 777 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'getSaleById')
        .resolves({ message: 'Sale not found' });

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  describe('4.4. Deletando uma venda pelo id', function () {
    it('a. Deve retornar o status 204', async function () {
      const res = {};
      const req = {
        params: { id: 2 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'deleteSaleById')
        .resolves(2);

      await salesController.deleteSaleById(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it('b. Deve retornar o status 404, se o id é inexistente', async function () {
      const res = {};
      const req = {
        params: { id: 999 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'deleteSaleById')
        .resolves({ message: 'Sale not found' });

      await salesController.deleteSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
    });
  });

  describe('4.5. Modificando uma venda cadastrada', function () {
    it('a. Deve retornar o status 200 e com dados da venda', async function () {
      const res = {};
      const req = {
        body: updateSaleMock,
        params: { id: 2 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'updateSaledProduct')
        .resolves({ id: 2, updateSaleMock });

      await salesController.updateSaledProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id: 2, updateSaleMock });
    });

    it('b. Deve retornar o status 404 com a mensagem de erro', async function () {
      const res = {};
      const req = {
        body: updateSaleMock,
        params: { id: 999 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'updateSaledProduct')
        .resolves({ message: 'Product not found' });

      await salesController.updateSaledProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});