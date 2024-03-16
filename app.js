import express from 'express';
import dotenv from 'dotenv';
import homeRoutes from './src/routes/homeRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import filesRoutes from './src/routes/filesRoutes.js';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }


  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/category', categoryRoutes);
    this.app.use('/files', filesRoutes);

  }
}

export default new App().app;
