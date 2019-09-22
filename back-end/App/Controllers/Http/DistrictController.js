const DistrictService = require("../../Services/DistrictService");

class DistrictController {
  constructor() {
    this.districtService = DistrictService;
  }

  async getAll({ req, res, next }) {
    const result = await this.districtService.getAll();

    return result.success ? res.json(result) : next(result);
  }
}

module.exports = new DistrictController();
