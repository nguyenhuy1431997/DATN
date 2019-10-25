const jwt = require("jsonwebtoken");

const { jsonError } = require("../Utils/system");

const TokenModel = require("../Models/TokenModel");

class AuthMiddleware {
  constructor() {
    this.tokenModel = TokenModel;
  }

  async auth({ req, res, next }) {
    const token = req.headers.authorization;
    if (!token) {
      return next({
        message: "Token_is_required",
        data: null
      });
    }

    const tokenFromDb = await this.tokenModel
      .query()
      .where({ token: token, status: true })
      .first();

    if (!tokenFromDb) {
      return next(jsonError("UnAuthorization"));
    }

    try {
      const dataToken = jwt.verify(token, Env.APP_KEY);

      req.userId = dataToken.userId;
      req.body.userId = dataToken.userId;
      next();
    } catch (err) {
      return next(jsonError("UnAuthorization"));
    }
  }

  noAuth() {
    // TODO no Authentication
  }
}

module.exports = new AuthMiddleware();
