const ProductAgeService = require("../../Services/ProductAgeService");

class ProductAgeController {
  constructor() {
    this.productAgeService = ProductAgeService;
  }

  async getAll({ req, res, next }) {
    const result = await this.productAgeService.getAll();

    return result.success ? res.json(result) : next(result);
  }
}

module.exports = new ProductAgeController();
