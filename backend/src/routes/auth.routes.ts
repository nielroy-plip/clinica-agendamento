import { Router } from 'express';
import { loginDentist, loginPatient, createDentist } from '../controllers/auth.controller';

const router = Router();

// login para dentista
router.post('/auth/dentist/login', loginDentist);

// login para pacientes
router.post('/aut/patient/login', loginPatient);

// teste ciração de dentista
router.post('/auth/dentist/register', createDentist);

export default router;