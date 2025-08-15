import { Router } from 'express';
import { loginDentist, loginPatient } from '../controllers/auth.controller';

const router = Router();

// login para dentista
router.post('/auth/dentist/login', loginDentist);

// login para pacientes
router.post('/aut/patient/login', loginPatient);

export default router;