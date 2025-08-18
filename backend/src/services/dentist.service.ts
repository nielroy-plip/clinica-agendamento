import { Dentist } from '../models/dentist.model';

export const findDentistByEmail = async ( email: string ) => {
  return await Dentist.findOne({ where: { email }});
};