const { body } = require("express-validator");
const ProductService = require("../Services/ProductService");
const ProductColorService = require("../Services/ProductColorService");
var path = require("path");

module.exports = [
  // body("images")
  //   .exists()
  //   .withMessage("images_are_required")
  //   .not()
  //   .isEmpty()
  //   .withMessage("images_are_required"),

  body("productId")
    .exists()
    .withMessage("productId_is_required")
    .not()
    .isEmpty()
    .withMessage("productId_is_required")
    .custom(value => {
      return ProductService.findOneById(value).then(result => {
        if (!result.success) {
          return Promise.reject(result.error);
        }
      });
    }),

  body("productColorId")
    .exists()
    .withMessage("productColorId_is_required")
    .not()
    .isEmpty()
    .withMessage("productColorId_is_required")
    .custom(value => {
      return ProductColorService.findOneById(value).then(result => {
        if (!result.success) {
          return Promise.reject(result.error);
        }
      });
    })
];
