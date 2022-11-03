import BaseController from "./baseController.js";

export default class ReviewsController extends BaseController {
  constructor(reviewModel, bookingModel) {
    //pass the model you want to use for this.model into super
    super(reviewModel);
    this.reviewModel = reviewModel;
    this.bookingModel = bookingModel;
  }

  // Retrieve all reviews for specific court
  async getThisCourtReview(req, res) {
    const { courtId } = req.params;
    try {
      const output = await this.reviewModel.findAll({
        where: { court_id: courtId },
        order: [
          ["booking", "date", "ASC"],
          ["booking", "timeslot", "ASC"],
        ],
        include: this.bookingModel,
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve review for specific booking
  async getThisBookingReview(req, res) {
    const { bookingId } = req.params;
    try {
      const userReview = await this.reviewModel.findOne({
        where: {
          booking_id: bookingId,
        },
      });
      return res.json(userReview);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Create a review
  async createReview(req, res) {
    try {
      const review = await this.reviewModel.create(req.body);
      return res.json(review);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Update a specific court
  async updateReview(req, res) {
    const { bookingId } = req.params;
    try {
      const review = await this.reviewModel.update(
        { ratings: req.body.status, experience: req.body.experience },
        { where: { booking_id: bookingId }, returning: true }
      );

      return res.json(review[1][0]);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
