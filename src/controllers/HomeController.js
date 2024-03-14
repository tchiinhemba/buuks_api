class HomeController {

  index(req, res) {
    res.json({
      welcome: 'Welcome to Buuks API',
      aboutAPI: {
        name: 'Buuks api',
        version: '1.0.0',
      },
      about_author: {
        name: 'Eládio Tchiinhemba',
        bio: 'Working with web development for almost five years. His experience lies in developing web applications using React, Node.js and JavaScript. RESTful APIs. They are used by the insurance, blockchain and financial sectors. An intentional communicator and enthusiastic collaborator, Eládio is comfortable leading and being led and eager to solve challenging problems.'
      }
    })
  }
}


export default new HomeController();
