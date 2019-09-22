const Model = require("./Models");

class ProductColorModel extends Model {
  constructor() {
    super();
  }

  static get tableName() {
    return "productcolors";
  }
}

module.exports = ProductColorModel;
