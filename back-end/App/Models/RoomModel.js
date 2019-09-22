const Model = require("./Models");

class RoomModel extends Model {
  constructor() {
    super();
  }

  static get tableName() {
    return "rooms";
  }
}

module.exports = RoomModel;
