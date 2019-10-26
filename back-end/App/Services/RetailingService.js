const RoomModel = require("../Models/RoomModel");
const RetailingRoomModel = require("../Models/RetailingRoomModel");
const { jsonSuccess, jsonError } = require("../Utils/system");
const Errors = require("../Utils/errors");

const statusRentailing = {
  PENDING: "PENDING",
  APPROVE: "APPROVE",
  REJECT: "REJECT"
};

class RetailingService {
  constructor() {
    this.roomModel = RoomModel;
    this.retailingRoomModel = RetailingRoomModel;
  }

  async create(body) {
    try {
      const room = await this.roomModel
        .query()
        .where({ id: body.roomId, status: true })
        .first();

      if (!room) {
        return jsonError(Errors.ROOM_NOT_EXIST);
      }

      if (room.isAvailable) {
        return jsonError(Errors.ROOM_NOT_READY);
      }

      const retailing = await this.retailingRoomModel
        .query()
        .where({
          renterId: body.userId,
          roomId: body.roomId,
          status: statusRentailing.PENDING
        })
        .first();

      if (retailing) {
        return jsonError(Errors.ROOM_WAITING_RESPONSE);
      }

      const dataInsert = {
        roomId: body.roomId,
        renterId: body.userId,
        status: statusRentailing.PENDING
      };

      const data = await this.retailingRoomModel.query().insert(dataInsert);
      return jsonSuccess(data);
    } catch (error) {
      console.log(error);
      return jsonError(error);
    }
  }

  async delete(body) {
    try {
      const retailing = await this.retailingRoomModel
        .query()
        .where({ id: body.id })
        .first();

      if (!retailing) {
        return jsonError(Errors.RETAILING_NOT_FOUND);
      }

      if (retailing.renterId !== body.userId) {
        return jsonError(Errors.WHAT_ARE_U_DOING);
      }

      if (retailing.status !== statusRentailing.PENDING) {
        return jsonError(Errors.RETAILING_CAN_NOT_DEL);
      }

      await this.retailingRoomModel
        .query()
        .where({ id: body.id })
        .del();

      return jsonSuccess();
    } catch (error) {
      console.log(error);
      return jsonError(error);
    }
  }

  async getAllByUserLogin(userId) {
    try {
      const retailings = await this.retailingRoomModel
        .query()
        .innerJoin("rooms", "rooms.id", "retailingrooms.roomId")
        .innerJoin("users as a", "a.id", "retailingrooms.renterId")
        .innerJoin("users as b", "b.id", "rooms.userId")
        .where({ renterId: userId })
        .orWhere("rooms.userId", userId)
        .select({
          room: "rooms.name",
          renter: "a.name",
          status: "retailingrooms.status",
          created_at: "retailingrooms.created_at",
          owner: "b.name"
        });

      return jsonSuccess(retailings);
    } catch (error) {
      return jsonError(error);
    }
  }

  async approvalRetailing(userId, retailingId) {
    try {
      const room = await this.checkRetailing(userId, retailingId);

      await this.retailingRoomModel
        .query()
        .where("id", retailingId)
        .update({ status: statusRentailing.APPROVE });

      await this.retailingRoomModel
        .query()
        .where({ roomId: room.id, status: statusRentailing.PENDING })
        .update({ status: statusRentailing.REJECT });

      await this.roomModel
        .query()
        .where({ id: room.id })
        .update({ isAvailable: false });

      return jsonSuccess();
    } catch (error) {
      return jsonError(error);
    }
  }

  async rejectRetailing(userId, retailingId) {
    try {
      await this.checkRetailing(userId, retailingId);

      await this.retailingRoomModel
        .query()
        .where("id", retailingId)
        .update({ status: statusRentailing.REJECT });

      return jsonSuccess();
    } catch (error) {
      return jsonError(error);
    }
  }

  async checkRetailing(userId, retailingId) {
    const retailing = await this.retailingRoomModel
      .query()
      .innerJoin("rooms", "rooms.id", "retailingrooms.roomId")
      .where({ "retailingrooms.id": retailingId, "rooms.userId": userId })
      .select({
        id: "retailingrooms.roomId",
        status: "retailingrooms.status"
      })
      .first();

    if (!retailing) {
      throw jsonError(Errors.RETAILING_NOT_FOUND);
    }

    if (retailing.status !== statusRentailing.PENDING) {
      throw jsonError(Errors.RETAILING_STATUS_NOT_ALLOWED);
    }

    return retailing;
  }
}

module.exports = new RetailingService();
