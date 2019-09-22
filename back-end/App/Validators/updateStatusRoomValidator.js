const { param } = require("express-validator");
const RoomService = require("../Services/RoomService");

const deleteValidator = [
  param("id").custom(value => {
    return RoomService.findOneById(value).then(result => {
      if (!result.success) {
        return Promise.reject(result.error);
      }
    });
  })
];

const restoreValidator = [
  param("id").custom(value => {
    return RoomService.findOneById(value, false).then(result => {
      if (!result.success) {
        return Promise.reject(result.error);
      }
    });
  })
];

module.exports = { deleteValidator, restoreValidator };
