const { param, body } = require("express-validator");
const UserService = require("../Services/UserService");

const deleteValidator = [
  param("id").custom(value => {
    return UserService.getUserById(value).then(result => {
      if (!result.success) {
        return Promise.reject(result.error);
      }
    });
  })
];

const restoreValidator = [
  param("id").custom(value => {
    return UserService.getUserById(value, false).then(result => {
      if (!result.success) {
        return Promise.reject(result.error);
      }
    });
  })
];

const updateValidator = [
  param("id").custom(value => {
    return UserService.getUserById(value).then(result => {
      if (!result.success) {
        return Promise.reject(result.error);
      }
    });
  }),

  body("email")
    .exists()
    .isEmail()
    .withMessage("email_is_wrong")
];

module.exports = { deleteValidator, restoreValidator, updateValidator };
