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
      "/courtpics/:courtId",
      upload.array("pictures", 5),
      this.controller.postCourtPictures.bind(this.controller)
    );
    router.post(
      "/:userId/profilepic",
      upload.single("picture"),
      this.controller.postProfilePic.bind(this.controller)
    );

    return router;
  }
}
