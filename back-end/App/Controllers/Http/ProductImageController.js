const ProductImageService = require("../../Services/ProductImageService");
//const upload = require("../../../App/Middlewares/uploadImageMiddleware");

class ProductImageController {
  constructor() {
    this.productImageService = ProductImageService;
  }

  async insert({ req, res, next }) {
    const { body } = req;

    body.files = req.files;

    const result = await this.productImageService.insert(body);

    return result.success
      ? res.json(
          await this.productImageService.getAllByProductId(body.productId)
        )
      : next(result);
  }

  async delete({ req, res, next }) {
    const { id } = req.params;

    const result = await this.productImageService.delete(id);

    return result.success ? res.json(result) : next(result);
  }

  async getAllByProductId({ req, res, next }) {
    const { body } = req;

    const result = await this.productImageService.getAllByProductId(
      body.productId
    );

    return result.success ? res.json(result) : next(result);
  }
}

module.exports = new ProductImageController();
