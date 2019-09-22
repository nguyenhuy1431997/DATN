const RoomImageService = require("../../Services/RoomImageService");
//const upload = require("../../../App/Middlewares/uploadImageMiddleware");

class RoomImageController {
  constructor() {
    this.roomImageService = RoomImageService;
  }

  async insert({ req, res, next }) {
    const { body } = req;

    body.files = req.files;

    const result = await this.roomImageService.insert(body);

    return result.success
      ? res.json(await this.roomImageService.getAllByRoomId(body.roomId))
      : next(result);
  }

  async delete({ req, res, next }) {
    const { id } = req.params;

    const result = await this.roomImageService.delete(id);

    return result.success ? res.json(result) : next(result);
  }

  async getAllByRoomId({ req, res, next }) {
    const { body } = req;

    const result = await this.roomImageService.getAllByRoomId(body.roomId);

    return result.success ? res.json(result) : next(result);
  }
}

module.exports = new RoomImageController();
