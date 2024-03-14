import { Router } from 'express';
import categoryController from '../controllers/CategoryController.js';

const router = Router();

router.get('/', categoryController.index);

export default router;
