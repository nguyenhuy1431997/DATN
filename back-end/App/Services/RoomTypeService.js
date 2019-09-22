const RoomTypeModel = require("../Models/RoomTypeModel");
const { jsonSuccess, jsonError } = require("../Utils/system");
const Errors = require("../Utils/errors");

class RoomTypeService {
  constructor() {
    this.roomTypeModel = RoomTypeModel;
  }

  async getAll() {
    const data = await this.roomTypeModel.query().select();
    return jsonSuccess(data);
  }

  async findOneById(id) {
    const data = await this.roomTypeModel
      .query()
      .where({ id: id })
      .first();

    if (!data) {
      return jsonError(Errors.TYPE_NOT_EXIST);
    }

    return jsonSuccess(data);
  }
}

module.exports = new RoomTypeService();
