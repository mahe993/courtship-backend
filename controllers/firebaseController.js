import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase.js";

export default class FirebaseController {
  constructor(courtModel) {
    this.courtModel = courtModel;
  }

  // Post to firebase court pictures
  async postCourtPictures(req, res) {
    const { userId, courtId } = req.params;
    const pictureData = [];
    try {
      // upload to firebase and push downloadurl + ref
      req.files.forEach((file, index) => {
        const storageFilePath = `user${userId}/court${courtId}/pic${index + 1}`;
        const storageRef = ref(storage, storageFilePath);
        const uploadTask = uploadBytesResumable(storageRef, file.buffer, {
          contentType: "image/jpg",
        });
        uploadTask.on(
          "state_changed",
          null,
          //error handling
          (err) => res.status(400).json({ error: true, msg: err.code }),
          //success handling - get download url
          async () => {
            console.log("here");
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            pictureData.push({ refPath: storageFilePath, url: url });
          }
        );
      });
      return res.json(pictureData);

      // update row under url col
      // const court = await this.courtModel.update();
      // return res.json(court);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Post to firebase court pictures
  async test(req, res) {
    const { userId, courtId } = req.params;
    const uploadQueue = [];
    const downloadQueue = [];
    const pictureData = [];
    try {
      // upload to firebase and push downloadurl + ref
      req.files.forEach((file) => {
        const storageFilePath = `user${userId}/court${courtId}/pic-${file.originalname}`;
        const storageRef = ref(storage, storageFilePath);
        const uploadTask = uploadBytesResumable(storageRef, file.buffer, {
          contentType: "image/jpg",
        });
        uploadQueue.push(uploadTask);
        uploadTask.on(
          "state_changed",
          null,
          //error handling
          (err) => res.status(400).json({ error: true, msg: err.code }),
          //success handling - get download url
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            downloadQueue.push(getDownloadURL(uploadTask.snapshot.ref));
            pictureData.push({ refPath: storageFilePath, url: url });
          }
        );
      });

      const awaitUploadCompletion = await Promise.all(uploadQueue);
      const awaitDownloadCompletion = await Promise.all(downloadQueue);
      return res.json(pictureData);

      // update row under url col
      // const court = await this.courtModel.update();
      // return res.json(court);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
