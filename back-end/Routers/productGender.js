const express = require("express");

const productGenderController = require("../App/Controllers/Http/ProductGenderController");

const router = express.Router();

router.route("/").get((req, res, next) => {
  productGenderController.getAll({ req, res, next });
});

module.exports = router;
