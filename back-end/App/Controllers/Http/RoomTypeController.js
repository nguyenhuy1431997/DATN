const RoomTypeService = require("../../Services/RoomTypeService");

class RoomTypeController {
  constructor() {
    this.roomTypeService = RoomTypeService;
  }

  async getAll({ req, res, next }) {
    const result = await this.roomTypeService.getAll();

    return result.success ? res.json(result) : next(result);
  }
}

module.exports = new RoomTypeController();
