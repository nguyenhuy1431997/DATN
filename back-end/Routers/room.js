const express = require("express");

const authMiddleware = require("../App/Middlewares/AuthMiddleware");

const roomController = require("../App/Controllers/Http/RoomController");

const insertRoomValidator = require("../App/Validators/insertRoomValidator");

const updateRoomValidator = require("../App/Validators/updateRoomValidator");

const uploadImage = require("../App/Middlewares/uploadImageMiddleware");

const { jsonError, validatorToJsonError } = require("../App/Utils/system");

const fs = require("fs");
const {
  restoreValidator,
  deleteValidator
} = require("../App/Validators/updateStatusRoomValidator");

const { validationResult } = require("express-validator");
const router = express.Router();

router.get("/:id", (req, res, next) => {
  roomController.getById({ req, res, next });
});

router.get("/filter/:page/:pageSize", (req, res, next) => {
  roomController.filter({ req, res, next });
});

router.use((req, res, next) => {
  authMiddleware.auth({ req, res, next });
});

router.post("/", insertRoomValidator, (req, res, next) => {
  const errors = validationResult(req);

  if (errors.errors.length) {
    return next(validatorToJsonError(errors));
  }

  roomController.insert({ req, res, next });
});

router.put("/:id", updateRoomValidator, (req, res, next) => {
  const errors = validationResult(req);

  if (errors.errors.length) {
    return next(validatorToJsonError(errors));
  }

  roomController.update({ req, res, next });
});

router.post("/:id/delete", deleteValidator, (req, res, next) => {
  const errors = validationResult(req);

  if (errors.errors.length) {
    return next(validatorToJsonError(errors));
  }

  roomController.delete({ req, res, next });
});

router.post("/:id/restore", restoreValidator, (req, res, next) => {
  const errors = validationResult(req);

  if (errors.errors.length) {
    return next(validatorToJsonError(errors));
  }

  roomController.restore({ req, res, next });
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
  insertRoomValidator,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.errors.length) {
      //Xoa anh
      req.files.forEach(file => {
        fs.unlinkSync(file.path);
      });
      return next(validatorToJsonError(errors));
    }

    roomController.insertWithImage({ req, res, next });
  }
);

module.exports = router;
