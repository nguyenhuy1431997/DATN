const Model = require("./Models");

class ProductAgeModel extends Model {
  constructor() {
    super();
  }

  static get tableName() {
    return "productages";
  }
}

module.exports = ProductAgeModel;
