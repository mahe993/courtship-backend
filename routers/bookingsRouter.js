import express from "express";

const router = express.Router();

export default class BookingsRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }

  routes() {
    router.get(
      "/court:courtId",
      this.controller.getCourtBookings.bind(this.controller)
    );
    router.get(
      "/user:userId",
      this.checkJwt,
      this.controller.getUserBookings.bind(this.controller)
    );
    router.get(
      "/success/:bookingId",
      this.checkJwt,
      this.controller.getSuccessfulBooking.bind(this.controller)
    );
    router.post(
      "/",
      this.checkJwt,
      this.controller.createBooking.bind(this.controller)
    );

    return router;
  }
}
