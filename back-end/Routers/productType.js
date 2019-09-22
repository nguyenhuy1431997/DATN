const express = require("express");

const router = express.Router();

const productTypeController = require("../App/Controllers/Http/ProductTypeController");

router.get("/", (req, res, next) => {
  productTypeController.getAll({ req, res, next });
});
module.exports = router;
