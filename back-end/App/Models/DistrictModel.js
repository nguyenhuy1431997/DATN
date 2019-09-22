const Model = require("./Models");

class DistrictModel extends Model {
  constructor() {
    super();
  }

  static get tableName() {
    return "districts";
  }
}

module.exports = DistrictModel;
