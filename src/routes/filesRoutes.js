import { Router } from "express";
import filesController from "../controllers/FilesController.js";

const router = Router();

router.get('/', filesController.index)

export default router;
