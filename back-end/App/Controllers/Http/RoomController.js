const RoomService = require("../../Services/RoomService");
const RoomImageService = require("../../Services/RoomImageService");
const { jsonSuccess } = require("../../Utils/system");

class RoomController {
  constructor() {
    this.roomService = RoomService;
    this.roomImageService = RoomImageService;
  }

  async insert({ req, res, next }) {
    const { body } = req;
    body.userId = req.userId;
    const result = await this.roomService.insert(body);

    return result.success ? res.json(result) : next(result);
  }

  async insertWithImage({ req, res, next }) {
    const { body } = req;

    const roomInserted = await this.roomService.insert(body);

    if (!roomInserted.success) {
      return next(roomInserted);
    }

    body.files = req.files;
    body.roomId = roomInserted.result.id;
    const imageInserted = await this.roomImageService.insert(body);

    if (!imageInserted.success) {
      return next(imageInserted);
    }

    const result = await this.roomService.findOneById(roomInserted.result.id);

    return result.success ? res.json(result) : next(result);
  }

  async update({ req, res, next }) {
    const { body } = req;
    const { id } = req.params;

    const result = await this.roomService.update(id, body);

    return result.success ? res.json(result) : next(result);
  }

  async delete({ req, res, next }) {
    const { id } = req.params;

    const result = await this.roomService.delete(id);

    return result.success ? res.json(result) : next(result);
  }

  async restore({ req, res, next }) {
    const { id } = req.params;

    const result = await this.roomService.restore(id);

    return result.success ? res.json(result) : next(result);
  }

  async getById({ req, res, next }) {
    const roomId = req.params.id;

    let roomResult = await this.roomService.findOneById(roomId);

    if (!roomResult.success) {
      return next(roomResult);
    }

    const roomImageResult = await this.roomImageService.getAllByRoomId(roomId);

    if (!roomImageResult.success) {
      return next(roomImageResult);
    }

    const dataReturn = {
      room: roomResult.result,
      images: roomImageResult.result
    };

    return res.json(jsonSuccess(dataReturn));
  }

  async filter({ req, res, next }) {
    const { page, pageSize } = req.params;
    const { districtId, roomTypeId, keySearch } = req.query;

    const result = await this.roomService.filter({
      page,
      pageSize,
      keySearch,
      districtId,
      roomTypeId
    });

    if (!result.success) {
      return next(result);
    }

    result.result.rooms = await Promise.all(
      result.result.rooms.map(async value => {
        value.images = await this.roomImageService.getAllByRoomId(value.id);
        return value;
      })
    );

    return res.json(result);
  }
}

module.exports = new RoomController();
