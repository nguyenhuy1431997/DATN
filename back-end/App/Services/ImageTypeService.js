const ImageTypeModel = require("../Models/ImageTypeModel");
const { jsonSuccess, jsonError } = require("../Utils/system");
const Errors = require("../Utils/errors");

class ImageTypeService {
  constructor() {
    this.imageTypeModel = ImageTypeModel;
  }

  async getAll() {
    const data = await this.imageTypeModel.query().select();
    return jsonSuccess(data);
  }

  async findOneById(id) {
    if (!id) {
      return jsonError(Errors.IMAGE_TYPE_REQUIRED);
    }

    const data = await this.imageTypeModel
      .query()
      .where({ id: id })
      .first();

    if (!data) {
      return jsonError(Errors.IMAGE_TYPE_REQUIRED);
    }

    return jsonSuccess(data);
  }
}

module.exports = new ImageTypeService();
