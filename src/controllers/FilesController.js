import { authorize } from "../services/connection/gcpConnection.js";
import { listFiles } from "../services/functions/listFiles.js";

class FilesController {
  async index(req, res) {
    try {
      const data = await authorize().then(listFiles);
      res.json(data);
    } catch(error) {
      console.log(error)
    }
  }
}

export default new FilesController();
