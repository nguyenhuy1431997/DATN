const UserModel = require("../Models/UserModel");
const TokenModel = require("../Models/TokenModel");
const { encode, generateToken } = require("../Utils/authHelper");
const { jsonSuccess, jsonError } = require("../Utils/system");
const Errors = require("../Utils/errors");
class AuthService {
  constructor() {
    this.userModel = UserModel;
    this.tokenModel = TokenModel;
  }

  async insertTokenToDb({ userId, token }) {
    const dataTokenInsert = {
      user_id: userId,
      token,
      status: true
    };

    await this.tokenModel.query().insert(dataTokenInsert);
  }

  async register(body) {
    try {
      const user = await this.userModel
        .query()
        .where("username", body.username)
        .first();

      if (user) {
        return jsonError(Errors.USER_IS_EXIST);
      }

      const dataInsert = {
        username: body.username,
        password: encode(body.password),
        name: body.username
      };

      const userInsert = await this.userModel.query().insert(dataInsert);

      const token = generateToken(userInsert.id);

      this.insertTokenToDb({ token, userId: userInsert.id });

      return jsonSuccess({ token: token });
    } catch (error) {
      return jsonError(error);
    }
  }

  async login(body) {
    const user = await this.userModel
      .query()
      .where({ username: body.username })
      .first();

    if (!user) {
      return jsonError(Errors.USERNAME_IS_WRONG);
    }

    if (user.password !== encode(body.password)) {
      return jsonError(Errors.PASSWORD_IS_WRONG);
    }

    const token = generateToken(user.id);

    this.insertTokenToDb({ userId: user.id, token });
    return jsonSuccess({ token });
  }

  async logout(token) {
    const result = await this.tokenModel
      .query()
      .where({ token })
      .update({ status: false });

    if (result) {
      return jsonSuccess();
    }

    return jsonError(Errors.SOME_THING_WRONG);
  }
}

module.exports = new AuthService();
