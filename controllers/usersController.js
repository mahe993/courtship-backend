import BaseController from "./baseController.js";

export default class UsersController extends BaseController {
  constructor(userModel) {
    //pass the model you want to use for this.model into super
    super(userModel);
    this.userModel = userModel;
  }

  // find or create specific user
  async getUser(req, res) {
    const { userId, email } = req.params;
    console.log(req.params);
    try {
      const [user, created] = await this.userModel.findOrCreate({
        where: { id: userId },
        defaults: { email: email },
      });
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
