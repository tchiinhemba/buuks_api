import { authorize, listFolders } from "../services/drive/gcpConnection.js";

class CategoryController {

  async index(req, res) {
    try {
      const data = await authorize().then(listFolders);
      // console.log(data)
      res.json(data)
    } catch (error) {
      console.log(error);
    }
  }
}


export default new CategoryController();
