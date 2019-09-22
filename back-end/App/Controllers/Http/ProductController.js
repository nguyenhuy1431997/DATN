const ProductService = require("../../Services/ProductService");
const ProductImageService = require("../../Services/ProductImageService");
const { jsonSuccess } = require("../../Utils/system");

class ProductController {
  constructor() {
    this.productService = ProductService;
    this.productImageService = ProductImageService;
  }

  async insert({ req, res, next }) {
    const { body } = req;

    const result = await this.productService.insert(body);

    return result.success ? res.json(result) : next(result);
  }

  async insertWithImage({ req, res, next }) {
    const { body } = req;

    const productInserted = await this.productService.insert(body);

    if (!productInserted.success) {
      return next(productInserted);
    }

    body.files = req.files;
    body.productId = productInserted.result.id;
    const imageInserted = await this.productImageService.insert(body);

    if (!imageInserted.success) {
      return next(imageInserted);
    }

    const result = await this.productService.findOneById(
      productInserted.result.id
    );
    
    return result.success ? res.json(result) : next(result);
  }

  async update({ req, res, next }) {
    const { body } = req;
    const { id } = req.params;

    const result = await this.productService.update(id, body);

    return result.success ? res.json(result) : next(result);
  }

  async delete({ req, res, next }) {
    const { id } = req.params;

    const result = await this.productService.delete(id);

    return result.success ? res.json(result) : next(result);
  }

  async restore({ req, res, next }) {
    const { id } = req.params;

    const result = await this.productService.restore(id);

    return result.success ? res.json(result) : next(result);
  }

  async getById({ req, res, next }) {
    const productId = req.params.id;

    let productResult = await this.productService.findOneById(productId);

    if (!productResult.success) {
      return next(productResult);
    }

    const productImageResult = await this.productImageService.getAllByProductId(
      productId
    );

    if (!productImageResult.success) {
      return next(productImageResult);
    }

    const dataReturn = {
      product: productResult.result,
      productImages: productImageResult.result
    };

    return res.json(jsonSuccess(dataReturn));
  }

  async filter({ req, res, next }) {
    const { page, pageSize } = req.params;
    const { genderId, typeId, ageId, keySearch } = req.query;

    const result = await this.productService.filter({
      page,
      pageSize,
      keySearch,
      genderId,
      typeId,
      ageId
    });

    if (!result.success) {
      return next(result);
    }

    result.result.products = await Promise.all(
      result.result.products.map(async value => {
        value.productImages = await this.productImageService.getAllByProductId(
          value.id
        );
        return value;
      })
    );

    return res.json(result);
  }
}

module.exports = new ProductController();
