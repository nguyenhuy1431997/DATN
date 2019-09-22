const ProductModel = require("../Models/ProductModel");
const { jsonSuccess, jsonError } = require("../Utils/system");
const Errors = require("../Utils/errors");

class ProductService {
  constructor() {
    this.productModel = ProductModel;
  }

  async insert(body) {
    try {
      const dataInsert = {
        name: body.name,
        productage_id: body.ageId,
        productgender_id: body.genderId,
        producttype_id: body.typeId,
        title: body.title,
        price: body.price
      };

      const productInsert = await this.productModel.query().insert(dataInsert);
      return jsonSuccess(productInsert);
    } catch (error) {
      return jsonError(error);
    }
  }

  async findOneByName(name) {
    try {
      const product = await this.productModel
        .query()
        .where({ name: name, status: true })
        .first();

      if (!product) {
        return jsonError(Errors.PRODUCT_NOT_EXIST);
      }

      return jsonSuccess(product);
    } catch (error) {
      return jsonError(error);
    }
  }

  async findOneById(id, status = true) {
    try {
      if (!id) {
        return jsonError(Errors.PRODUCT_ID_REQUIRED);
      }

      const product = await this.productModel
        .query()
        .innerJoin("productages", "productages.id", "products.productage_id")
        .innerJoin("producttypes", "producttypes.id", "products.producttype_id")
        .innerJoin(
          "productgenders",
          "productgenders.id",
          "products.productgender_id"
        )
        .where({ "products.id": id, "products.status": status })
        .select({
          id: "products.id",
          name: "products.name",
          gender_id: "productgenders.id",
          gender_name: "productgenders.name",
          type_id: " producttypes.id",
          type_name: "producttypes.name",
          age_id: "productages.id",
          age_name: "productages.name"
        })
        .first();

      if (!product) {
        return jsonError(Errors.PRODUCT_NOT_EXIST);
      }

      return jsonSuccess(product);
    } catch (error) {
      return jsonError(error);
    }
  }

  async filter({ page, pageSize, keySearch, genderId, typeId, ageId }) {
    try {
      const query = this.productModel
        .query()
        .innerJoin("productages", "productages.id", "products.productage_id")
        .innerJoin("producttypes", "producttypes.id", "products.producttype_id")
        .innerJoin(
          "productgenders",
          "productgenders.id",
          "products.productgender_id"
        )
        .where("status", true);

      const counterQuery = this.productModel.query();

      if (keySearch) {
        query.where("products.name", "like", `%${keySearch.trim()}%`);
        counterQuery.where("products.name", "like", `%${keySearch.trim()}%`);
      }

      if (genderId) {
        query.where("productgender_id", genderId);
        counterQuery.where("productgender_id", genderId);
      }

      if (ageId) {
        query.where("productage_id", ageId);
        counterQuery.where("productage_id", ageId);
      }

      if (typeId) {
        query.where("producttype_id", typeId);
        counterQuery.where("producttype_id", typeId);
      }

      const products = await query
        .limit(pageSize)
        .offset((page - 1) * pageSize)
        .select({
          id: "products.id",
          name: "products.name",
          gender_id: "productgenders.id",
          gender_name: "productgenders.name",
          type_id: " producttypes.id",
          type_name: "producttypes.name",
          age_id: "productages.id",
          age_name: "productages.name",
          price: "products.price",
          title: "products.title"
        });

      const pageSum = await counterQuery.count("* as total");

      return jsonSuccess({
        pageSum:
          pageSum[0].total / pageSize > parseInt(pageSum[0].total / pageSize)
            ? parseInt(pageSum[0].total / pageSize) + 1
            : parseInt(pageSum[0].total / pageSize),
        products: products
      });
    } catch (error) {
      return jsonError(error);
    }
  }

  async update(id, body) {
    try {
      const dataUpdate = {
        name: body.name,
        productage_id: body.ageId,
        productgender_id: body.genderId,
        producttype_id: body.typeId,
        price: body.price,
        title: body.title
      };

      const productUpdated = await this.productModel
        .query()
        .where("id", id)
        .update(dataUpdate);

      return jsonSuccess(productUpdated);
    } catch (error) {
      return jsonError(error);
    }
  }

  async delete(id) {
    try {
      const productDeleted = await this.productModel
        .query()
        .where("id", id)
        .update({ status: false });

      return jsonSuccess(productDeleted);
    } catch (error) {
      return jsonError(error);
    }
  }

  async restore(id) {
    try {
      const productDeleted = await this.productModel
        .query()
        .where("id", id)
        .update({ status: true });

      return jsonSuccess(productDeleted);
    } catch (error) {
      return jsonError(error);
    }
  }
}

module.exports = new ProductService();
