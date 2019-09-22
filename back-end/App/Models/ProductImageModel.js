const Model = require("./Models");

class ProductImageModel extends Model {
  constructor() {
    super();
  }

  static get tableName() {
    return "productimages";
  }
}

module.exports = ProductImageModel;
