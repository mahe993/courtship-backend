import express from "express";

const router = express.Router();

export default class CourtsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:userId", this.controller.getUserCourts.bind(this.controller));
    router.get(
      "/courtyard/:courtId",
      this.controller.getSpecificCourt.bind(this.controller)
    );
    router.post("/", this.controller.createCourt.bind(this.controller));
    return router;
  }
}
