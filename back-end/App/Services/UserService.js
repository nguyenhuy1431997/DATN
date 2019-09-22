const UserModel = require("../Models/UserModel");
const { jsonSuccess, jsonError } = require("../Utils/system");

class UserService {
  constructor() {
    this.userModel = UserModel;
  }

  async filter({ page, pageSize, keySearch }) {
    try {
      const userQuery = this.userModel.query();

      const counterQuery = this.userModel.query();

      if (keySearch) {
        userQuery.where("users.name", "like", `%${keySearch.trim()}%`);
        counterQuery.where("users.name", "like", `%${keySearch.trim()}%`);
      }

      const users = await userQuery
        .limit(pageSize)
        .offset((page - 1) * pageSize)
        .select({
          id: "users.id",
          username: "users.username",
          name: "users.name",
          gender: "users.gender",
          phone: "users.phone",
          firstname: "users.firstname",
          lastname: "users.lastname",
          email: "users.email",
          status: "user.status"
        });

      console.log(users);

      const pageSum = await counterQuery.count("* as total");

      return jsonSuccess({
        pageSum:
          pageSum[0].total / pageSize > parseInt(pageSum[0].total / pageSize)
            ? parseInt(pageSum[0].total / pageSize) + 1
            : parseInt(pageSum[0].total / pageSize),
        users: users
      });
    } catch (error) {
      return jsonError(error);
    }
  }

  async getUserById(id, status = true) {
    try {
      const userFromDb = await this.userModel
        .query()
        .where({ id: id, status: status })
        .first();

      if (!userFromDb) {
        return jsonError("can_not_find_user");
      }

      const data = {
        username: userFromDb.username,
        name: userFromDb.name,
        gender: userFromDb.gender,
        phone: userFromDb.phone,
        firstname: userFromDb.firstname,
        lastname: userFromDb.lastname,
        email: userFromDb.email,
        status: userFromDb.status,
        isAdmin: userFromDb.isAdmin,
      };

      return jsonSuccess(data);
    } catch (error) {
      return jsonError(error);
    }
  }

  async update(id, body) {
    try {
      const userUpdate = {
        name: body.name,
        email: body.email,
        phone: body.phone,
        firstname: body.firstname,
        lastname: body.lastname,
        gender: body.gender,
      };

      const userFromDb = await this.userModel
        .query()
        .whereNot({ id: id })
        .andWhere({ name: userUpdate.name })
        .first();

      if (userFromDb) {
        return jsonError("name_exists");
      }

      const userToUpdated = await this.userModel
        .query()
        .where({ id: id })
        .update(userUpdate);

      if (!userToUpdated) {
        return jsonError("can_not_find_user");
      }

      return jsonSuccess("updated_success");
    } catch (error) {
      return jsonError(error);
    }
  }

  async delete(id) {
    try {
      const userFromDb = await this.userModel
        .query()
        .where({ id: id, status: true })
        .update({ status: false });

      if (!userFromDb) {
        return jsonError("can_not_find_user");
      }

      return jsonSuccess("deleted_success");
    } catch (error) {
      return jsonError(error);
    }
  }

  async restore(id) {
    try {
      const userFromDb = await this.userModel
        .query()
        .where({ id: id, status: false })
        .update({ status: true });

      if (!userFromDb) {
        return jsonError("can_not_find_user");
      }

      return jsonSuccess("restored_success");
    } catch (error) {
      return jsonError(error);
    }
  }
}

module.exports = new UserService();
