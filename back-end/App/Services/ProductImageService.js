const ProductImageModel = require("../Models/ProductImageModel");
const ProductColorModel = require("../Models/ProductColorModel");
const { jsonSuccess, jsonError } = require("../Utils/system");
const { getUrl } = require("../Utils/urlHelper");

class ProductImageService {
  constructor() {
    this.productImageModel = ProductImageModel;
    this.productColorModel = ProductColorModel;
  }

  async insert(body) {
    try {
      for (let i = 0; i < body.files.length; i++) {
        let dataInsert = {
          imagename: body.files[i].filename,
          product_id: body.productId,
          productcolor_id: body.productColorId
        };
        await this.productImageModel.query().insert(dataInsert);
      }

      return jsonSuccess();
    } catch (error) {
      return jsonError(error);
    }
  }

  async delete(id) {
    try {
      const result = await this.productImageModel
        .query()
        .where("id", id)
        .del();

      return jsonSuccess(result);
    } catch (error) {
      return jsonError(error);
    }
  }

  async getAllByProductId(id) {
    try {
      const dataFromDb = await this.productImageModel
        .query()
        .innerJoin(
          "productcolors",
          "productimages.productcolor_id",
          "productcolors.id"
        )
        .where({ product_id: id })
        .select(
          "productcolors.id as colorId",
          "productimages.id",
          "productimages.imagename"
        );

      const productColors = await this.productColorModel
        .query()
        .innerJoin(
          "productimages",
          "productcolors.id",
          "productimages.productcolor_id"
        )
        .where("productimages.product_id", id)
        .distinct("productcolors.id")
        .select("productcolors.name", "productcolors.id");

      const dataReturn = productColors.map(color => {
        const imageUrls = dataFromDb
          .filter(value => {
            return color.id === value.colorId;
          })
          .map(value => {
            return {
              id: value.id,
              imageLink: getUrl(value.imagename)
            };
          });
        color.imageUrls = imageUrls;
        return color;
      });

      return jsonSuccess(dataReturn);
    } catch (error) {
      return jsonError(error);
    }
  }
}

module.exports = new ProductImageService();
