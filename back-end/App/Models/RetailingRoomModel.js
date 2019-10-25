const Model = require("./Models");

class RetailingRoomModel extends Model {
  constructor() {
    super();
  }

  static get tableName() {
    return "retailingrooms";
  }
}

module.exports = RetailingRoomModel;
