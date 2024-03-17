import { authorize } from "../services/connection/gcpConnection.js";
import { listFolders } from "../services/functions/listFolders.js";

class CategoryController {

  async index(req, res) {
    try {
      const data = await authorize().then(listFolders);
      res.json(data)
      console.log(data.length)
    } catch (error) {
      console.log(error);
    }
  }
}


export default new CategoryController();
