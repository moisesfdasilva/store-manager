const salProdFieldsAuthMiddware = async (req, res, next) => {
  const saledProduct = req.body;
  saledProduct.map(({ productId, quantity }) => {
    if (productId === undefined) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    if (quantity === undefined) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    if (Math.trunc(quantity) < 1) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
  });
  next();
};

module.exports = salProdFieldsAuthMiddware;