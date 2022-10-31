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
      "/:bookingId",
      this.checkJwt,
      this.controller.getSpecificBooking.bind(this.controller)
    );
    router.put(
      "/:bookingId",
      this.checkJwt,
      this.controller.updateSpecificBooking.bind(this.controller)
    );
    router.post(
      "/",
      this.checkJwt,
      this.controller.createBooking.bind(this.controller)
    );

    return router;
  }
}
