const UserService = require("../../Services/UserService");

class UserController {
  constructor() {
    this.userService = UserService;
  }

  async filter({ req, res, next }) {
    const { pageSize, page } = req.params;
    const { keySearch } = req.query;

    const result = await this.userService.filter({ page, pageSize, keySearch });

    return result.success ? res.json(result) : next(result);
  }

  async getUserLogin({ req, res, next }) {
    const id = req.userId;

    const result = await this.userService.getUserById(id);

    return result.success ? res.json(result) : next(result);
  }

  async getUserById({ req, res, next }) {
    const id = req.params.id;

    const result = await this.userService.getUserById(id);

    return result.success ? res.json(result) : next(result);
  }

  async update({ req, res, next }) {
    const id = req.params.id;
    const { body } = req;

    const result = await this.userService.update(id, body);

    return result.success ? res.json(result) : next(result);
  }

  async restore({ req, res, next }) {
    const id = req.params.id;

    const result = await this.userService.restore(id);

    return result.success ? res.json(result) : next(result);
  }

  async delete({ req, res, next }) {
    const id = req.params.id;

    const result = await this.userService.delete(id);

    return result.success ? res.json(result) : next(result);
  }
}

module.exports = new UserController();
