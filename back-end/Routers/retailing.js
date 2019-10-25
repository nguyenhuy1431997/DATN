const express = require("express");
const retailingController = require("../App/Controllers/Http/RetailingController");

const authMiddleware = require("../App/Middlewares/AuthMiddleware");

const router = express.Router();

router.use((req, res, next) => {
  authMiddleware.auth({ req, res, next });
});

router.get("/", (req, res, next) => {
  retailingController.getAllByUserLogin({ req, res, next });
});

router.post("/", (req, res, next) => {
  retailingController.create({ req, res, next });
});

router.delete("/", (req, res, next) => {
  retailingController.delete({ req, res, next });
});

router.put("/:retailingId/approve", (req, res, next) => {
  retailingController.approvalRetailing({ req, res, next });
});

router.put("/:retailingId/reject", (req, res, next) => {
  retailingController.rejectRetailing({ req, res, next });
});

module.exports = router;
