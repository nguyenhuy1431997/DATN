const express = require("express");

const router = express.Router();

const roomTypeController = require("../App/Controllers/Http/RoomTypeController");

router.get("/", (req, res, next) => {
  roomTypeController.getAll({ req, res, next });
});
module.exports = router;
