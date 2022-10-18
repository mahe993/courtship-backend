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
      this.controller.postCourtPictures.bind(this.controller)
    );

    return router;
  }
}
