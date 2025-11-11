import { Router } from "express";
import { addCidade, deleteCidade, getAllCidades, getWeather, updateCidade } from "../controllers/cidadeController.js";

const router = Router();

router.get('/', getAllCidades);
router.post('/', addCidade);
router.delete('/:id', deleteCidade);
router.put('/:id', updateCidade);
router.get('/:id/clima', getWeather);

export default router;