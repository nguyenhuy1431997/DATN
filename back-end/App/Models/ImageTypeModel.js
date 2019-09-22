const Model = require("./Models");

class ImageTypeModel extends Model {
  constructor() {
    super();
  }

  static get tableName() {
    return "imagetypes";
  }
}

module.exports = ImageTypeModel;
