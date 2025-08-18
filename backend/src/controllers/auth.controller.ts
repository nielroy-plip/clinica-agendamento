import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Dentist, Patient} from '../models';

export const loginDentis = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const dentist = await findDentistByEmail(email);
  if (!dentist) return res.status(404).json({ error: 'Dentista não encontrado'});

  const isMatch = await bcrypt.compare(password, dentist.password);
  if (!isMatch) return res.status(401).json({ error: 'Senha incorreta'});

  const token = jwt.sign({ id: dentist.id}, 'SEGREDO_SUPER_SECRETO', { expiresIn: '1h'});
  res.json({ token, user: { id: dentist.id, name: dentist.name} });
};

export const loginPatient = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const patient = await findPatientByEmail(email);
  if (!patient) return res.status(404).json({ error: 'Paciente não encontrado'});

  const isMatch = await bcrypt.compare(password, patient.password);
  if (!isMatch) return res.status(401).json({ error: 'Senha incorreta'});

  const token = jwt.sign({ id: patient.id}, 'SEGREDO_SUPER_SECRETO', { expiresIn: '1h'});
  res.json({ token, user: { id: patient.id, name: patient.name} });
};