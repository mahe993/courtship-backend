import BaseController from "./baseController.js";

export default class ListingsController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Retrieve all court listings posted by specific userId
  async getUserListings(req, res) {
    const { userId } = req.params;
    try {
      const userListings = await this.model.findByPk(userId);
      return res.json(userListings);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
