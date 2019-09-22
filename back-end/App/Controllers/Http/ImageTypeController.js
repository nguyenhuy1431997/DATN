const ImageTypeService = require("../../Services/ImageTypeService");

class ImageTypeController {
  constructor() {
    this.imageTypeService = ImageTypeService;
  }

  async getAll({ req, res, next }) {
    const result = await this.imageTypeService.getAll();

    return result.success ? res.json(result) : next(result);
  }
}

module.exports = new ImageTypeController();
