const ProductColorService = require("../../Services/ProductColorService");

class ProductColorController {
  constructor() {
    this.productColorService = ProductColorService;
  }

  async getAll({ req, res, next }) {
    const result = await this.productColorService.getAll();

    return result.success ? res.json(result) : next(result);
  }
}

module.exports = new ProductColorController();
