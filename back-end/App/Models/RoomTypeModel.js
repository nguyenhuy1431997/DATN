const Model = require("./Models");

class RoomTypeModel extends Model {
  constructor() {
    super();
  }

  static get tableName() {
    return "roomtypes";
  }
}

module.exports = RoomTypeModel;
