import express from "express";

const router = express.Router();

export default class CourtsRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }

  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get(
      "/:userId",
      this.checkJwt,
      this.controller.getUserCourts.bind(this.controller)
    );
    router.get(
      "/courtyard/:courtId",
      this.controller.getSpecificCourt.bind(this.controller)
    );
    router.post(
      "/",
      this.checkJwt,
      this.controller.createCourt.bind(this.controller)
    );
    return router;
  }
}
