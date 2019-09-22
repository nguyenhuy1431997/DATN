const express = require("express");
const imageTypeController = require("../App/Controllers/Http/ImageTypeController");

const router = express.Router();

router.route("/").get((req, res, next) => {
  imageTypeController.getAll({ req, res, next });
});

module.exports = router;
