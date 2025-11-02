import { Router } from 'express';
import { addContinente, deleteContinente, getAllContinentes, updateContinente } from '../controllers/continenteController.js';

const router = Router();

router.get('/', getAllContinentes);
router.post('/', addContinente);
router.put('/:id', updateContinente);
router.delete('/:id', deleteContinente);

export default router;