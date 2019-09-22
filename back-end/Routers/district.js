const express = require("express");

const districtController = require("../App/Controllers/Http/DistrictController");

const router = express.Router();

router.route("/").get((req, res, next) => {
  districtController.getAll({ req, res, next });
});

module.exports = router;
