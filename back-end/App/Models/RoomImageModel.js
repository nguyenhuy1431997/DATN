const Model = require("./Models");

class RoomImageModel extends Model {
  constructor() {
    super();
  }

  static get tableName() {
    return "roomimages";
  }
}

module.exports = RoomImageModel;
