const ProductTypeModel = require("../Models/ProductTypeModel");
const { jsonSuccess, jsonError } = require("../Utils/system");
const Errors = require("../Utils/errors");

class ProductTypeService {
  constructor() {
    this.productTypeModel = ProductTypeModel;
  }

  async getAll() {
    const data = await this.productTypeModel.query().select();
    return jsonSuccess(data);
  }

  async findOneById(id) {
    const data = await this.productTypeModel
      .query()
      .where({ id: id })
      .first();

    if (!data) {
      return jsonError(Errors.TYPE_NOT_EXIST);
    }

    return jsonSuccess(data);
  }
}

module.exports = new ProductTypeService();
