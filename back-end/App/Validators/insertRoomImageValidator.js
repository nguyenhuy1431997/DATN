const { body } = require("express-validator");
const RoomService = require("../Services/RoomService");
const ImageTypeService = require("../Services/ImageTypeService");

module.exports = [
  // body("images")
  //   .exists()
  //   .withMessage("images_are_required")
  //   .not()
  //   .isEmpty()
  //   .withMessage("images_are_required"),

  body("roomId")
    .exists()
    .withMessage("roomId_is_required")
    .not()
    .isEmpty()
    .withMessage("roomId_is_required")
    .custom(value => {
      return RoomService.findOneById(value).then(result => {
        if (!result.success) {
          return Promise.reject(result.error);
        }
      });
    }),

  body("imageTypeId")
    .exists()
    .withMessage("imageTypeId_is_required")
    .not()
    .isEmpty()
    .withMessage("imageTypeId_is_required")
    .custom(value => {
      return ImageTypeService.findOneById(value).then(result => {
        if (!result.success) {
          return Promise.reject(result.error);
        }
      });
    })
];
