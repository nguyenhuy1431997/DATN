const Model = require("./Models");

class TokenModel extends Model {
  constructor() {
    super();
  }

  static get tableName() {
    return "Tokens";
  }
}

module.exports = TokenModel;
