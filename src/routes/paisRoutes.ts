import { Router } from 'express';
import { addPais, getAllPaises } from '../controllers/paisController.js';

const router = Router();

router.get('/', getAllPaises);
router.post('/', addPais);

export default router;