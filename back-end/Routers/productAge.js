const express = require("express");

const productAgeController = require("../App/Controllers/Http/ProductAgeController");

const router = express.Router();

router.route("/").get((req, res, next) => {
  productAgeController.getAll({ req, res, next });
});

module.exports = router;
