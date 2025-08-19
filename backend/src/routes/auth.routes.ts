import { Router } from 'express';
import { loginDentist, loginPatient, createDentist } from '../controllers/auth.controller';

const authRoutes = Router();

// login para dentista
authRoutes.post('/auth/dentist/login', loginDentist);

// login para pacientes
authRoutes.post('/aut/patient/login', loginPatient);

// teste ciração de dentista
authRoutes.post('/auth/dentist/register', createDentist);

export default authRoutes;