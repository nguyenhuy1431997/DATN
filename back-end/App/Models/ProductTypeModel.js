const Model = require("./Models");

class ProductTypeModel extends Model {
  constructor() {
    super();
  }

  static get tableName() {
    return "producttypes";
  }
}

module.exports = ProductTypeModel;
