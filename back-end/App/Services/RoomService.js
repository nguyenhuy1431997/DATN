const RoomModel = require("../Models/RoomModel");
const { jsonSuccess, jsonError } = require("../Utils/system");
const Errors = require("../Utils/errors");

class RoomService {
  constructor() {
    this.roomModel = RoomModel;
  }

  async insert(body) {
    try {
      const dataInsert = {
        name: body.name,
        address: body.address,
        districtId: body.districtId,
        roomTypeId: body.roomTypeId,
        userId: body.userId,
        priority: body.priority,
        description: body.description,
        area: body.area,
        price: body.price
      };

      const roomInsert = await this.roomModel.query().insert(dataInsert);
      return jsonSuccess(roomInsert);
    } catch (error) {
      return jsonError(error);
    }
  }

  async findOneByName(name) {
    try {
      const room = await this.roomModel
        .query()
        .where({ name: name, status: true })
        .first();

      if (!room) {
        return jsonError(Errors.ROOM_NOT_EXIST);
      }

      return jsonSuccess(room);
    } catch (error) {
      return jsonError(error);
    }
  }

  async findOneById(id, status = true) {
    try {
      if (!id) {
        return jsonError(Errors.ROOM_ID_REQUIRED);
      }

      const room = await this.roomModel
        .query()
        .innerJoin("districts", "districts.id", "rooms.districtId")
        .innerJoin("roomtypes", "roomtypes.id", "rooms.roomTypeId")
        .where({ "rooms.id": id, "rooms.status": status })
        .select({
          id: "rooms.id",
          name: "rooms.name",
          address: "rooms.address",
          districtId: "districts.id",
          districtName: "districts.name",
          roomTypeId: "roomtypes.id",
          roomTypeName: "roomtypes.name",
          priority: "rooms.priority",
          description: "rooms.description",
          area: "rooms.area",
          price: "rooms.price"
        })
        .first();

      if (!room) {
        return jsonError(Errors.ROOM_NOT_EXIST);
      }

      return jsonSuccess(room);
    } catch (error) {
      return jsonError(error);
    }
  }

  async filter({ page, pageSize, keySearch, districtId, roomTypeId }) {
    try {
      const query = this.roomModel
        .query()
        .innerJoin("districts", "districts.id", "rooms.districtId")
        .innerJoin("roomtypes", "roomtypes.id", "rooms.roomTypeId")
        .where("status", true);

      const counterQuery = this.roomModel.query();

      if (keySearch) {
        query.where("rooms.name", "like", `%${keySearch.trim()}%`);
        counterQuery.where("rooms.name", "like", `%${keySearch.trim()}%`);
      }

      if (districtId) {
        query.where("districtId", districtId);
        counterQuery.where("districtId", districtId);
      }

      if (roomTypeId) {
        query.where("roomtypeId", roomTypeId);
        counterQuery.where("roomtypeId", roomTypeId);
      }

      const rooms = await query
        .limit(pageSize)
        .offset((page - 1) * pageSize)
        .select({
          id: "rooms.id",
          name: "rooms.name",
          address: "rooms.address",
          districtId: "districts.id",
          districtName: "districts.name",
          roomTypeId: "roomtypes.id",
          roomTypeName: "roomtypes.name",
          priority: "rooms.priority",
          description: "rooms.description",
          area: "rooms.area",
          price: "rooms.price"
        });

      const pageSum = await counterQuery.count("* as total");

      return jsonSuccess({
        pageSum:
          pageSum[0].total / pageSize > parseInt(pageSum[0].total / pageSize)
            ? parseInt(pageSum[0].total / pageSize) + 1
            : parseInt(pageSum[0].total / pageSize),
        rooms: rooms
      });
    } catch (error) {
      return jsonError(error);
    }
  }

  async update(id, body) {
    try {
      const dataUpdate = {
        name: body.name,
        address: body.address,
        districtId: body.districtId,
        roomTypeId: body.roomTypeId,
        userId: body.userId,
        priority: body.priority,
        description: body.description,
        area: body.area,
        price: body.price
      };

      const roomUpdated = await this.roomModel
        .query()
        .where("id", id)
        .update(dataUpdate);

      return jsonSuccess(roomUpdated);
    } catch (error) {
      return jsonError(error);
    }
  }

  async delete(id) {
    try {
      const roomDeleted = await this.roomModel
        .query()
        .where("id", id)
        .update({ status: false });

      return jsonSuccess(roomDeleted);
    } catch (error) {
      return jsonError(error);
    }
  }

  async restore(id) {
    try {
      const roomDeleted = await this.roomModel
        .query()
        .where("id", id)
        .update({ status: true });

      return jsonSuccess(roomDeleted);
    } catch (error) {
      return jsonError(error);
    }
  }
}

module.exports = new RoomService();
