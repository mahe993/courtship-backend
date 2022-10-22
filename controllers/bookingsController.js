import BaseController from "./baseController.js";

export default class BookingsController extends BaseController {
  constructor(bookingModel) {
    //pass the model you want to use for this.model into super
    super(bookingModel);
    this.bookingModel = bookingModel;
  }

  // Retrieve all bookings by specific court
  async getCourtBookings(req, res) {
    const { courtId } = req.params;
    try {
      const courtBookings = await this.bookingModel.findAll({
        where: {
          court_id: courtId,
        },
      });
      return res.json(courtBookings);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve all bookings by specific user
  async getUserBookings(req, res) {
    const { userId } = req.params;
    try {
      const userBookings = await this.bookingModel.findAll({
        where: {
          user_id: userId,
        },
      });
      return res.json(userBookings);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
