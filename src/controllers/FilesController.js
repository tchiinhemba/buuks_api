import { files } from "../../server.js";

class FilesController {
  index(req, res) {
    res.json(files);
  }
}

export default new FilesController();
