const express = require("express");

const router = express.Router();

const authController = require("../App/Controllers/Http/AuthController");

const authMiddleware = require("../App/Middlewares/AuthMiddleware");

const { validatorToJsonError } = require("../App/Utils/system");

//Validators
const registerValidator = require("../App/Validators/registerValidator");

const { validationResult } = require("express-validator");

router.post("/register", registerValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (errors.errors.length) {
    return next(errors);
  }

  authController.register({ req, res, next });
});

router.post("/login", registerValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (errors.errors.length) {
    return next(validatorToJsonError(errors));
  }
  authController.login({ req, res, next });
});

router.use((req, res, next) => {
  authMiddleware.auth({ req, res, next });
});

router.post("/logout", (req, res, next) => {
  authController.logout({ req, res, next });
});
module.exports = router;
