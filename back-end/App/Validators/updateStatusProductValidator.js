const { param } = require("express-validator");
const ProductService = require("../Services/ProductService");

const deleteValidator = [
  param("id").custom(value => {
    return ProductService.findOneById(value).then(result => {
      if (!result.success) {
        return Promise.reject(result.error);
      }
    });
  })
];

const restoreValidator = [
  param("id").custom(value => {
    return ProductService.findOneById(value, false).then(result => {
      if (!result.success) {
        return Promise.reject(result.error);
      }
    });
  })
];

module.exports = { deleteValidator, restoreValidator };
