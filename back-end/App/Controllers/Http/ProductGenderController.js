const ProductGenderService = require("../../Services/ProductGenderService");

class ProductGenderController {
  constructor() {
    this.productGenderService = ProductGenderService;
  }

  async getAll({ req, res, next }) {
    const result = await this.productGenderService.getAll();

    return result.success ? res.json(result) : next(result);
  }
}

module.exports = new ProductGenderController();
