import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase.js";

export default class FirebaseController {
  constructor(courtModel) {
    this.courtModel = courtModel;
  }

  // Post to firebase court pictures
  async postCourtPictures(req, res) {
    const { courtId } = req.params;
    const pictureData = [];
    try {
      // upload to firebase and push downloadurl + ref
      req.files.forEach((file) => {
        const storageFilePath = `courtpics/court${courtId}/pic-${file.originalname}`;
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
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            pictureData.push({ firebasePath: storageFilePath, url: url });
          }
        );
      });
      while (pictureData.length !== req.files.length) {
        await new Promise((res) => setTimeout(res, 500));
      }
      const court = await this.courtModel.update(
        { pictureUrl: pictureData },
        { where: { id: courtId }, returning: true }
      );
      // ensure only 1 court is updated
      return res.json(court[0] === 1);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getPictureUrlObject(snapshot) {
    const result = await getDownloadURL(snapshot.ref);
    return { firebasePath: snapshot.metadata.fullPath, url: result };
  }

  async test(req, res) {
    const { courtId } = req.params;
    try {
      const promisesArr = req.files.map(async (file) => {
        const storageFilePath = `courtpics/court${courtId}/pic${file.originalname}`;
        const storageRef = ref(storage, storageFilePath);
        // upload to firebase
        const uploadTask = await uploadBytesResumable(storageRef, file.buffer, {
          contentType: "image/jpg",
          cacheControl: "no-cache",
        });
        // get picture downloadurl and firebasepath as an object
        const downloadTask = await this.getPictureUrlObject(uploadTask);
        return downloadTask;
      });
      const picturesData = await Promise.all(promisesArr);
      // update courts table with an array of picture data objects
      const updateCourt = await this.courtModel.update(
        { pictureUrl: picturesData },
        { where: { id: courtId }, returning: true }
      );
      // ensure only 1 court is updated
      return res.json(updateCourt[0] === 1);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
