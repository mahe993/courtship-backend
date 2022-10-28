import express from "express";

const router = express.Router();

export default class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      "/:userId/:email",
      this.controller.getUser.bind(this.controller)
    );
    router.put(
      "/:userId/wallet/",
      this.controller.walletTransaction.bind(this.controller)
    );
    return router;
  }
}
