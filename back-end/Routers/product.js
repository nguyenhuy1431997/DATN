const express = require("express");

const authMiddleware = require("../App/Middlewares/AuthMiddleware");

const productController = require("../App/Controllers/Http/ProductController");

const insertProductValidator = require("../App/Validators/insertProductValidator");

const updateProductValidator = require("../App/Validators/updateProductValidator");

const uploadImage = require("../App/Middlewares/uploadImageMiddleware");

const { jsonError, validatorToJsonError } = require("../App/Utils/system");

const fs = require("fs");
const {
  restoreValidator,
  deleteValidator
} = require("../App/Validators/updateStatusProductValidator");

const { validationResult } = require("express-validator");
const router = express.Router();

router.get("/:id", (req, res, next) => {
  productController.getById({ req, res, next });
});

router.get("/filter/:page/:pageSize", (req, res, next) => {
  productController.filter({ req, res, next });
});

router.use((req, res, next) => {
  authMiddleware.auth({ req, res, next });
});

router.post("/", insertProductValidator, (req, res, next) => {
  const errors = validationResult(req);

  if (errors.errors.length) {
    return next(validatorToJsonError(errors));
  }

  productController.insert({ req, res, next });
});

router.put("/:id", updateProductValidator, (req, res, next) => {
  const errors = validationResult(req);

  if (errors.errors.length) {
    return next(validatorToJsonError(errors));
  }

  productController.update({ req, res, next });
});

router.post("/:id/delete", deleteValidator, (req, res, next) => {
  const errors = validationResult(req);

  if (errors.errors.length) {
    return next(validatorToJsonError(errors));
  }

  productController.delete({ req, res, next });
});

router.post("/:id/restore", restoreValidator, (req, res, next) => {
  const errors = validationResult(req);

  if (errors.errors.length) {
    return next(validatorToJsonError(errors));
  }

  productController.restore({ req, res, next });
});

router.post(
  "/insert",
  (req, res, next) => {
    uploadImage.array("images", 12)(req, res, function(err) {
      if (!req.files.length) {
        return next(jsonError("images_are_required"));
      }

      if (err && !err.success) {
        return next(jsonError(err));
      }

      next();
    });
  },
  insertProductValidator,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.errors.length) {
      //Xoa anh
      req.files.forEach(file => {
        fs.unlinkSync(file.path);
      });
      return next(validatorToJsonError(errors));
    }

    productController.insertWithImage({ req, res, next });
  }
);

module.exports = router;
