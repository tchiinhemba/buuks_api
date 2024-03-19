import { folders } from "../../server.js";

class CategoryController {
  index(req, res) {
    res.json(folders);
  }
}

export default new CategoryController();
