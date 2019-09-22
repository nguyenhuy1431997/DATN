const ProductTypeService = require("../../Services/ProductTypeService");

class ProductTypeController {
  constructor() {
    this.productTypeService = ProductTypeService;
  }

  async getAll({ req, res, next }) {
    const result = await this.productTypeService.getAll();

    return result.success ? res.json(result) : next(result);
  }
}

module.exports = new ProductTypeController();
