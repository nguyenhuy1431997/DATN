const Model = require("./Models");

class UserModel extends Model {
  constructor() {
    super();
  }

  static get tableName() {
    return "users";
  }
}

module.exports = UserModel;
