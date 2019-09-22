const ProductGenderModel = require("../Models/ProductGenderModel");
const { jsonSuccess, jsonError } = require("../Utils/system");
const Errors = require("../Utils/errors");

class ProductGenderService {
  constructor() {
    this.productGenderModel = ProductGenderModel;
  }

  async getAll() {
    const data = await this.productGenderModel.query().select();

    return jsonSuccess(data);
  }

  async findOneById(id) {
    const data = await this.productGenderModel
      .query()
      .where({ id: id })
      .first();

    if (!data) {
      return jsonError(Errors.GENDER_NOT_EXIST);
    }

    return jsonSuccess(data);
  }
}

module.exports = new ProductGenderService();
