const { body } = require("express-validator");
const DistrictService = require("../Services/DistrictService");
const RoomTypeService = require("../Services/RoomTypeService");
const RoomService = require("../Services/RoomService");

module.exports = [
  body("name")
    .exists()
    .withMessage("name_is_required")
    .not()
    .isEmpty()
    .withMessage("name_is_required")
    .custom(value => {
      return RoomService.findOneByName(value).then(result => {
        if (result.success) {
          return Promise.reject("name_exists");
        }
      });
    }),
  body("districtId")
    .exists()
    .withMessage("districtId_is_required")
    .not()
    .isEmpty()
    .withMessage("districtId_is_required")
    .custom(value => {
      return DistrictService.findOneById(value).then(result => {
        if (!result.success) {
          return Promise.reject(result.error);
        }
      });
    }),

  body("roomTypeId")
    .exists()
    .withMessage("roomTypeId_is_required")
    .not()
    .isEmpty()
    .withMessage("roomTypeId_is_required")
    .custom(value => {
      return RoomTypeService.findOneById(value).then(result => {
        if (!result.success) {
          return Promise.reject(result.error);
        }
      });
    }),

  body("address")
    .exists()
    .withMessage("address_is_required")
    .not()
    .isEmpty()
    .withMessage("address_is_required"),

  body("area")
    .exists()
    .withMessage("area_is_required")
    .not()
    .isEmpty()
    .withMessage("area_is_required"),

  body("price")
    .exists()
    .withMessage("price_is_required")
    .not()
    .isEmpty()
    .withMessage("price_is_required")
];
