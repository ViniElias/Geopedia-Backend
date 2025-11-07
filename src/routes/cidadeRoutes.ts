import { Router } from "express";
import { addCidade, deleteCidade, getAllCidades, updateCidade } from "../controllers/cidadeController.js";

const router = Router();

router.get('/', getAllCidades);
router.post('/', addCidade);
router.delete('/:id', deleteCidade);
router.put('/:id', updateCidade);

export default router;