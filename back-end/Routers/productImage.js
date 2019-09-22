const express = require("express");
const productImageController = require("../App/Controllers/Http/ProductImageController");
const insertProductImageValidator = require("../App/Validators/insertProductImageValidator");
const { jsonError, validatorToJsonError } = require("../App/Utils/system");
const { validationResult } = require("express-validator");
const router = express.Router();
const uploadImage = require("../App/Middlewares/uploadImageMiddleware");
const authMiddleware = require("../App/Middlewares/AuthMiddleware");
const fs = require("fs");

router.use((req, res, next) => {
  authMiddleware.auth({ req, res, next });
});

router.post(
  "/upload",
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

  insertProductImageValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.errors.length) {
      //Xoa anh
      req.files.forEach(file => {
        fs.unlinkSync(file.path);
      });

      return next(validatorToJsonError(errors));
    }

    productImageController.insert({ req, res, next });
  }
);

router.delete("/:id", (req, res, next) => {
  productImageController.delete({ req, res, next });
});

module.exports = router;
