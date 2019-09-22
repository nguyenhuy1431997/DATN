const RoomImageModel = require("../Models/RoomImageModel");
const ImageTypeModel = require("../Models/ImageTypeModel");
const { jsonSuccess, jsonError } = require("../Utils/system");
const { getUrl } = require("../Utils/urlHelper");

class RoomImageService {
  constructor() {
    this.roomImageModel = RoomImageModel;
    this.imageTypeModel = ImageTypeModel;
  }

  async insert(body) {
    try {
      for (let i = 0; i < body.files.length; i++) {
        let dataInsert = {
          name: body.files[i].filename,
          roomId: body.roomId,
          imageTypeId: body.imageTypeId
        };
        await this.roomImageModel.query().insert(dataInsert);
      }

      return jsonSuccess();
    } catch (error) {
      return jsonError(error);
    }
  }

  async delete(id) {
    try {
      const result = await this.roomImageModel
        .query()
        .where("id", id)
        .del();

      return jsonSuccess(result);
    } catch (error) {
      return jsonError(error);
    }
  }

  async getAllByRoomId(id) {
    try {
      const dataFromDb = await this.roomImageModel
        .query()
        .innerJoin("imagetypes", "roomimages.imageTypeId", "imagetypes.id")
        .where({ roomId: id })
        .select(
          "imagetypes.id as imageTypeId",
          "roomimages.id",
          "roomimages.name"
        );

      const imageTypes = await this.imageTypeModel
        .query()
        .innerJoin("roomimages", "imagetypes.id", "roomimages.imageTypeId")
        .where("roomimages.roomId", id)
        .distinct("imagetypes.id")
        .select("imagetypes.name", "imagetypes.id");

      const dataReturn = imageTypes.map(type => {
        const imageUrls = dataFromDb
          .filter(value => {
            return type.id === value.imageTypeId;
          })
          .map(value => {
            return {
              id: value.id,
              imageLink: getUrl(value.name)
            };
          });
        type.imageUrls = imageUrls;
        return type;
      });

      return jsonSuccess(dataReturn);
    } catch (error) {
      return jsonError(error);
    }
  }
}

module.exports = new RoomImageService();
