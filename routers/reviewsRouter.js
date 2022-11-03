import express from "express";

const router = express.Router();

export default class ReviewsRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }

  routes() {
    router.get(
      "/courts/:courtId",
      this.controller.getThisCourtReview.bind(this.controller)
    );
    router.get(
      "/bookings/:bookingId",
      this.checkJwt,
      this.controller.getThisBookingReview.bind(this.controller)
    );
    router.post(
      "/",
      this.checkJwt,
      this.controller.createReview.bind(this.controller)
    );
    router.put(
      "/:bookingId",
      this.checkJwt,
      this.controller.updateReview.bind(this.controller)
    );
    return router;
  }
}
