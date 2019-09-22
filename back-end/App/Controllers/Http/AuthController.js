const TokenModel = require("../../Models/TokenModel");
const AuthService = require("../../Services/AuthService");

class AuthController {
  constructor() {
    this.tokenModel = TokenModel;
    this.authService = AuthService;
  }

  async register({ req, res, next }) {
    const { body } = req;

    const result = await this.authService.register(body);

    return result.success ? res.json(result) : next(result);
  }

  async login({ req, res, next }) {
    const { body } = req;

    const result = await this.authService.login(body);

    return result.success ? res.json(result) : next(result);
  }

  async logout({ req, res, next }) {
    const token = req.headers.authorization;

    const result = await this.authService.logout(token);

    return result.success ? res.json(result) : next(result);
  }
}

module.exports = new AuthController();
