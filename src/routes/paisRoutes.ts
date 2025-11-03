import { Router } from 'express';
import { addPais, deletePais, getAllPaises, updatePais } from '../controllers/paisController.js';

const router = Router();

router.get('/', getAllPaises);
router.post('/', addPais);
router.delete('/:id', deletePais);
router.put('/:id', updatePais);

export default router;