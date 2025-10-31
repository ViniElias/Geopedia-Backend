import { Router } from 'express';
import { addContinente } from '../controllers/continenteController.js';

const router = Router();

router.post('/', addContinente);

export default router;