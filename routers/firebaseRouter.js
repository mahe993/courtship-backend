import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer();

export default class FirebaseRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.post(
      "/:userId/:courtId",
      upload.array("pictures", 5),
      this.controller.test.bind(this.controller)
    );

    return router;
  }
}
