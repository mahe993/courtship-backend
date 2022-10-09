import BaseController from "./baseController.js";

export default class ListingsController extends BaseController {
  constructor(courtModel) {
    //pass the model you want to use for this.model into super
    super();
    this.courtModel = courtModel;
  }

  // Retrieve all court listings posted by specific userId
  async getUserListings(req, res) {
    const { userId } = req.params;
    try {
      const userListings = await this.courtModel.findByPk(userId);
      return res.json(userListings);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Create a court row tagged to specific userId
  async createCourt(req, res) {
    try {
      const court = await this.courtModel.create(req.body);
      return res.json(court);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
