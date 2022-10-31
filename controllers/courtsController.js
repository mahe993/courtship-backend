import BaseController from "./baseController.js";

export default class CourtsController extends BaseController {
  constructor(courtModel) {
    //pass the model you want to use for this.model into super
    super(courtModel);
    this.courtModel = courtModel;
  }

  // Retrieve all active courts
  async getAll(req, res) {
    try {
      const output = await this.courtModel.findAll({
        where: { status: "Active" },
        order: [["price", "ASC"]],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve all court listings posted by specific userId
  async getUserCourts(req, res) {
    const { userId } = req.params;
    try {
      const userListings = await this.courtModel.findAll({
        where: {
          user_id: userId,
        },
        order: [["created_at", "ASC"]],
      });
      return res.json(userListings);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve a specific court
  async getSpecificCourt(req, res) {
    const { courtId } = req.params;
    try {
      const specificCourt = await this.courtModel.findByPk(courtId);
      return res.json(specificCourt);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Update a specific court
  async updateSpecificCourt(req, res) {
    const { courtId } = req.params;
    try {
      const court = await this.courtModel.update(
        { status: req.body.status },
        { where: { id: courtId }, returning: true }
      );

      return res.json(court[1][0]);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Create a court row
  async createCourt(req, res) {
    try {
      const court = await this.courtModel.create(req.body);
      return res.json(court);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
