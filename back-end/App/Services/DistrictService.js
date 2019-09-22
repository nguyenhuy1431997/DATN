const DistrictModel = require("../Models/DistrictModel");
const { jsonSuccess, jsonError } = require("../Utils/system");
const Errors = require("../Utils/errors");

class DistrictService {
  constructor() {
    this.districtModel = DistrictModel;
  }

  async getAll() {
    const data = await this.districtModel.query().select();
    return jsonSuccess(data);
  }

  async findOneById(id) {
    const data = await this.districtModel
      .query()
      .where({ id: id })
      .first();

    if (!data) {
      return jsonError(Errors.DISTRICT_NOT_EXIST);
    }

    return jsonSuccess(data);
  }
}

module.exports = new DistrictService();
