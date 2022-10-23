import express from "express";

const router = express.Router();

export default class BookingsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      "/court:courtId",
      this.controller.getCourtBookings.bind(this.controller)
    );
    router.get(
      "/user:userId",
      this.controller.getUserBookings.bind(this.controller)
    );
    router.get(
      "/success/:bookingId",
      this.controller.getSuccessfulBooking.bind(this.controller)
    );
    router.post("/", this.controller.createBooking.bind(this.controller));

    return router;
  }
}
