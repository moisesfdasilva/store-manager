const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesModel = require('../../../src/models/salesModel');
const salesService = require('../../../src/services/salesService');
const validationsInputValues = require('../../../src/services/validation/validationsInputValues');

const {
  // registeredSaleMock,
  allSalesMock,
  salesByIdMock,
  updateSaleMock,
} = require('./mocks/salesService.mock');

describe('5. Teste de unidade do salesService', function () {
  describe('5.1. Cadastra a venda', function () {
    it('a. Deve retornar os dados da vendas', async function () {
      sinon
        .stub(validationsInputValues, 'validateProductsId')
        .resolves({ type: '', message: '' });
      sinon
        .stub(salesModel, 'insertSale')
        .resolves(3);
      sinon
        .stub(salesModel, 'insertSaleProducts')
        .resolves([{ productId: 1, quantity: 10 }]);

      const result = await salesService.insertSaledProduct([
        { productId: 1, quantity: 10 },
      ]);

      expect(result).to.deep.equal({
        id: 3,
        itemsSold: [{ productId: 1, quantity: 10 }],
      });
    });

    it('b. Deve retornar a mensagem de produto não encontrado', async function () {
      sinon
        .stub(validationsInputValues, 'validateProductsId')
        .resolves({ type: 'err', message: 'Product not found' });
      
      const result = await salesService.insertSaledProduct([
        { productId: 888, quantity: 888 },
      ]);

      expect(result).to.deep.equal({ message: 'Product not found' });
    });
  });

  describe('5.2. Listando todas vendas', function () {
    it('Deve retornar a lista completa', async function () {
      sinon
        .stub(salesModel, 'getAllSales')
        .resolves(allSalesMock);

      const result = await salesService.getAllSales();

      expect(result).to.deep.equal(allSalesMock);
    });
  });

  describe('5.3. Busca uma venda por id', function () {
    it('a. Deve retornar os dados da venda', async function () {
      sinon
        .stub(validationsInputValues, 'validateSaleId')
        .resolves({ type: '', message: '' });
      sinon
        .stub(salesModel, 'getSaleWhithProducById')
        .resolves(salesByIdMock);

      const result = await salesService.getSaleById(3);

      expect(result).to.deep.equal(salesByIdMock);
    });

    it('b. Deve retornar a mensagem de erro', async function () {
      sinon
        .stub(validationsInputValues, 'validateSaleId')
        .resolves({ type: 'err', message: 'Sale not found' });

      const result = await salesService.getSaleById(777);

      expect(result).to.deep.equal({ message: 'Sale not found' });
    });
  });

  describe('5.4. Deletando uma venda pelo id', function () {
    it('a. Deve retornar a quantidade de vendas deletadas', async function () {
      sinon
        .stub(validationsInputValues, 'validateSaleId')
        .resolves({ type: '', message: '' });
      sinon
        .stub(salesModel, 'deleteSaleById')
        .resolves(1);

      const result = await salesService.deleteSaleById(2);

      expect(result).to.deep.equal(1);
    });

    it('b. Deve retornar a mensagem de erro', async function () {
      sinon
        .stub(validationsInputValues, 'validateSaleId')
        .resolves({ type: 'err', message: 'Sale not found' });

      const result = await salesService.deleteSaleById(777);

      expect(result).to.deep.equal({ message: 'Sale not found' });
    });
  });

  describe('5.5. Modificando uma venda cadastrada', function () {
    it('a. Deve retornar os dados da vendas', async function () {
      sinon
        .stub(validationsInputValues, 'validateProductsId')
        .resolves({ type: '', message: '' });
      sinon
        .stub(validationsInputValues, 'validateSaleId')
        .resolves({ type: '', message: '' });
      sinon
        .stub(salesModel, 'updateSaledProduct')
        .resolves({ id: 1, productId: 1, quantity: 10 });
      
      const result = await salesService.updateSaledProduct({
        id: 1,
        saledProducts: updateSaleMock,
      });

      expect(result).to.deep.equal({
        saleId: 1,
        itemsUpdated: updateSaleMock,
      });
    });

    it('b. Deve retornar a mensagem de produto não encontrado', async function () {
      sinon
        .stub(validationsInputValues, 'validateProductsId')
        .resolves({ type: 'err', message: 'Product not found' });

      const result = await salesService.updateSaledProduct(888);

      expect(result).to.deep.equal({ message: 'Product not found' });
    });

    it('c. Deve retornar a mensagem de venda não encontrada', async function () {
      sinon
        .stub(validationsInputValues, 'validateProductsId')
        .resolves({ type: '', message: '' });
      sinon
        .stub(validationsInputValues, 'validateSaleId')
        .resolves({ type: 'err', message: 'Sale not found' });

      const result = await salesService.updateSaledProduct(888);

      expect(result).to.deep.equal({ message: 'Sale not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});