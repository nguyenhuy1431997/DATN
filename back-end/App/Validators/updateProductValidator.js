const { body, param } = require("express-validator");
const ProductAgeService = require("../Services/ProductAgeService");
const ProductGenderService = require("../Services/ProductGenderService");
const ProductTypeService = require("../Services/ProductTypeService");
const ProductService = require("../Services/ProductService");

module.exports = [
  param("id").custom(value => {
    return ProductService.findOneById(value).then(result => {
      if (!result.success) {
        return Promise.reject(result.error);
      }
    });
  }),

  body("name")
    .exists()
    .withMessage("name_is_required")
    .not()
    .isEmpty()
    .withMessage("name_is_required")
    .custom(value => {
      return ProductService.findOneByName(value).then(result => {
        if (result.success) {
          return Promise.reject(result.error);
        }
      });
    }),
  body("ageId")
    .exists()
    .withMessage("ageId_is_required")
    .not()
    .isEmpty()
    .withMessage("ageId_is_required")
    .custom(value => {
      return ProductAgeService.findOneById(value).then(result => {
        if (!result.success) {
          return Promise.reject(result.error);
        }
      });
    }),
  body("typeId")
    .exists()
    .withMessage("typeId_is_required")
    .not()
    .isEmpty()
    .withMessage("typeId_is_required")
    .custom(value => {
      return ProductGenderService.findOneById(value).then(result => {
        if (!result.success) {
          return Promise.reject(result.error);
        }
      });
    }),
  body("genderId")
    .exists()
    .withMessage("genderId_is_required")
    .not()
    .isEmpty()
    .withMessage("ageId_is_required")
    .custom(value => {
      return ProductTypeService.findOneById(value).then(result => {
        if (!result.success) {
          return Promise.reject(result.error);
        }
      });
    })
];
