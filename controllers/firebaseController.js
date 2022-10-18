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
    console.log(userId, courtId, req.body);
    try {
      const storageRef = ref(storage, `user${userId}/court${courtId}/pic${1}`);
      const uploadTask = uploadBytesResumable(storageRef, req.body);
      uploadTask.on(
        "state_changed",
        null,
        //error handling
        (err) => res.status(400).json({ error: true, msg: err.code }),
        //success handling - get download url
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          pictureData.push({ refPath: storageRef, url: url });
          console.log(storageRef === uploadTask.snapshot.ref);
        }
      );
      // upload to firebase and push downloadurl + ref
      // await req.files.forEach((file, index) => {
      //   const storageRef = ref(
      //     storage,
      //     `user${userId}/court${courtId}/pic${index + 1}`
      //   );
      //   const uploadTask = uploadBytesResumable(storageRef, file);
      //   uploadTask.on(
      //     "state_changed",
      //     null,
      //     //error handling
      //     (err) => res.status(400).json({ error: true, msg: err.code }),
      //     //success handling - get download url
      //     async () => {
      //       const url = await getDownloadURL(uploadTask.snapshot.ref);
      //       pictureData.push({ refPath: storageRef, url: url });
      //       console.log(storageRef === uploadTask.snapshot.ref);
      //     }
      //   );
      // });
      // update row under url col
      // const court = await this.courtModel.update();
      // return res.json(court);
      return res.json(pictureData);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
