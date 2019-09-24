const express = require("express");

const authMiddleware = require("../App/Middlewares/AuthMiddleware");

const userController = require("../App/Controllers/Http/UserController");

const { validationResult } = require("express-validator");

const { validatorToJsonError } = require("../App/Utils/system");

const {
  restoreValidator,
  deleteValidator,
  updateValidator
} = require("../App/Validators/updateUsersValidator");

const router = express.Router();

router.use((req, res, next) => {
  authMiddleware.auth({ req, res, next });
});

router.get("/filter/:page/:pageSize", (req, res, next) => {
  userController.filter({ req, res, next });
});

router.route("/me").get((req, res, next) => {
  userController.getUserLogin({ req, res, next });
});

router
  .route("/:id")
  .get((req, res, next) => {
    userController.getUserById({ req, res, next });
  })
  .put(updateValidator, (req, res, next) => {
    const errors = validationResult(req);

    if (errors.errors.length) {
      return next(validatorToJsonError(errors));
    }
    userController.update({ req, res, next });
  });

router.post("/:id/delete", deleteValidator, (req, res, next) => {
  const errors = validationResult(req);

  if (errors.errors.length) {
    return next(validatorToJsonError(errors));
  }

  userController.delete({ req, res, next });
});

router.post("/:id/restore", restoreValidator, (req, res, next) => {
  const errors = validationResult(req);

  if (errors.errors.length) {
    return next(validatorToJsonError(errors));
  }

  userController.restore({ req, res, next });
});

module.exports = router;
