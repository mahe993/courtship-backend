import express from "express";

const router = express.Router();

export default class ListingsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      "/:userId",
      this.controller.getUserListings.bind(this.controller)
    );
    return router;
  }
}
