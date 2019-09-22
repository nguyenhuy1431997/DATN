const Model = require("./Models");

class ProductGenderModel extends Model {
  constructor() {
    super();
  }

  static get tableName() {
    return "productgenders";
  }
}

module.exports = ProductGenderModel;
