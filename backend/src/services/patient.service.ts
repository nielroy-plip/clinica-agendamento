import { Patient } from '../models/patient.model';

export const findPatientByEmail = async ( email: string ) => {
  return await Patient.findOne({ where: { email }});
};