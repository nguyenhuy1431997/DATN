const express = require("express");
const ProductColorController = require("../App/Controllers/Http/ProductColorController");

const router = express.Router();

router.route("/").get((req, res, next) => {
  ProductColorController.getAll({ req, res, next });
});

router.route("/image").get((req, res, next) => {
  res.send()
});


module.exports = router;
