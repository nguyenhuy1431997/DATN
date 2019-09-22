const ProductAgeModel = require("../Models/ProductAgeModel");
const { jsonSuccess, jsonError } = require("../Utils/system");
const Errors = require("../Utils/errors");

class ProductAgeService {
  constructor() {
    this.productAgeModel = ProductAgeModel;
  }

  async getAll() {
    const data = await this.productageModel.query().select();
    return jsonSuccess(data);
  }

  async findOneById(id) {
    const data = await this.productAgeModel
      .query()
      .where({ id: id })
      .first();

    if (!data) {
      return jsonError(Errors.AGE_NOT_EXIST);
    }

    return jsonSuccess(data);
  }
}

module.exports = new ProductAgeService();
