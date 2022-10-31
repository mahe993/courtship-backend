import BaseController from "./baseController.js";

export default class BookingsController extends BaseController {
  constructor(bookingModel, courtModel) {
    //pass the model you want to use for this.model into super
    super(bookingModel);
    this.bookingModel = bookingModel;
    this.courtModel = courtModel;
  }

  // Retrieve all bookings time and date by specific court
  async getCourtBookings(req, res) {
    const { courtId } = req.params;
    try {
      const courtBookings = await this.bookingModel.findAll({
        where: {
          court_id: courtId,
        },
      });

      const bookingsTimeDate = courtBookings.map((booking) => {
        return { date: booking.date, timeslot: booking.timeslot };
      });
      return res.json(bookingsTimeDate);
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
        order: [
          ["date", "ASC"],
          ["timeslot", "ASC"],
        ],
        include: this.courtModel,
      });
      const bookingsWithPictures = userBookings.map((booking) => {
        const { court } = booking;
        delete booking.dataValues.court;
        booking.dataValues.pictureUrl = court.pictureUrl;
        return booking;
      });
      return res.json(bookingsWithPictures);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve specific booking
  async getSpecificBooking(req, res) {
    const { bookingId } = req.params;
    try {
      const booking = await this.bookingModel.findOne({
        where: { id: bookingId },
        include: this.courtModel,
      });
      const { court } = booking;
      delete booking.dataValues.court;
      booking.dataValues.address = court.address;
      return res.json(booking);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Update a specific booking
  async updateSpecificBooking(req, res) {
    const { bookingId } = req.params;
    try {
      const court = await this.bookingModel.update(
        { status: req.body.status },
        { where: { id: bookingId }, returning: true }
      );
      return res.json(court[1][0]);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Create booking
  async createBooking(req, res) {
    try {
      const newBooking = await this.bookingModel.create(req.body);
      return res.json(newBooking);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
