const Model = require("./Models");

class ProductModel extends Model {
  constructor() {
    super();
  }

  static get tableName() {
    return "products";
  }
}

module.exports = ProductModel;
