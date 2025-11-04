import { Router } from "express";
import { addCidade, getAllCidades } from "../controllers/cidadeController.js";

const router = Router();

router.get('/', getAllCidades);
router.post('/', addCidade);

export default router;