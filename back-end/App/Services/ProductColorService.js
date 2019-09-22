const ProductColorModel = require("../Models/ProductColorModel");
const { jsonSuccess, jsonError } = require("../Utils/system");
const Errors = require("../Utils/errors");

class ProductColorService {
  constructor() {
    this.productColorModel = ProductColorModel;
  }

  async getAll() {
    const data = await this.productColorModel.query().select();
    return jsonSuccess(data);
  }

  async findOneById(id) {
    if (!id) {
      return jsonError(Errors.COLOR_REQUIRED);
    }

    const data = await this.productColorModel
      .query()
      .where({ id: id })
      .first();

    if (!data) {
      return jsonError(Errors.COLOR_NOT_EXIST);
    }

    return jsonSuccess(data);
  }
}

module.exports = new ProductColorService();
