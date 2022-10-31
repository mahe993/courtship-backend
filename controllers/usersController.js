import db from "../db/models/index.js";
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

  // update wallet for user
  async walletTransaction(req, res) {
    const { userId } = req.params;
    try {
      const transaction = await db.sequelize.transaction(async (t) => {
        const user = await this.userModel.findByPk(userId, { transaction: t });
        const increment = await user.increment("wallet", {
          by: req.body.wallet,
          transaction: t,
        });
        const validate = await increment.validate();
        return validate;
      });
      return res.json(transaction);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // update user details
  async updateDetails(req, res) {
    const { userId } = req.params;
    try {
      const transaction = await db.sequelize.transaction(async (t) => {
        const user = await this.userModel.findByPk(userId, { transaction: t });
        const update = await user.update(
          { username: req.body.username, phoneNumber: req.body.phoneNumber },
          {
            transaction: t,
          }
        );
        return update;
      });
      return res.json(transaction);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
