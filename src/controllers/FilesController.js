import { authorize, listFiles } from "../services/drive/gcpConnection.js";

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
