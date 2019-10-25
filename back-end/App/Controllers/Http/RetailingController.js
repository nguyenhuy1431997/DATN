const RetailingService = require("../../Services/RetailingService");

class RetailingController {
    constructor() {
        this.retailingService = RetailingService;
    }

    async getAllByUserLogin({ req, res, next }) {

        const result = await this.retailingService.getAllByUserLogin(req.userId);

        return result.success ? res.json(result) : next(result);
    }

    async create({ req, res, next }) {

        const result = await this.retailingService.create(req.body);

        return result.success ? res.json(result) : next(result);
    }

    async delete({ req, res, next }) {

        const result = await this.retailingService.delete(req.body);

        return result.success ? res.json(result) : next(result);
    }

    async approvalRetailing({ req, res, next }) {
        const { retailingId } = req.params;

        const result = await this.retailingService.approvalRetailing(req.userId, retailingId);

        return result.success ? res.json(result) : next(result);
    }

    async rejectRetailing({ req, res, next }) {
        const { retailingId } = req.params;

        const result = await this.retailingService.rejectRetailing(req.userId, retailingId);

        return result.success ? res.json(result) : next(result);
    }
}

module.exports = new RetailingController();
