export default class BaseController {
  constructor(model) {
    this.model = model;
  }

  async getAll(req, res) {
    try {
      const output = await this.model.findAll({ order: [["id", "ASC"]] });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
