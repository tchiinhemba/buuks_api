

class TreeController {

  async index(req, res) {
    try {
      const data = await authorize().then(listFiles);
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
}

export default TreeController();
