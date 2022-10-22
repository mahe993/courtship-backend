import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase.js";

export default class FirebaseController {
  constructor(courtModel) {
    this.courtModel = courtModel;
  }

  // helper fn to create picture url object of firebasePath and downloadUrl
  async getPictureUrlObject(snapshot) {
    const picturelUrl = await getDownloadURL(snapshot.ref);
    return {
      firebasePath: snapshot.metadata.fullPath,
      downloadUrl: picturelUrl,
    };
  }

  // Post to firebase court pictures and update courts table with url
  async postCourtPictures(req, res) {
    const { courtId } = req.params;
    try {
      const promisesArr = req.files.map(async (file) => {
        const storageFilePath = `courtpics/court${courtId}/pic${file.originalname}`;
        const storageRef = ref(storage, storageFilePath);
        // upload to firebase
        const uploadTask = await uploadBytesResumable(storageRef, file.buffer, {
          contentType: "image/jpg",
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
