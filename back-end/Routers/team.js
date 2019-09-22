const express = require('express');

const authMiddleware = require("../App/Middlewares/AuthMiddleware");

const router = express.Router();

router.use((req, res, next) => {
  authMiddleware.auth({ req, res, next });
});

router.get("/", (req, res, next) => {
  res.status(200).json("OK");
});

module.exports = router;
