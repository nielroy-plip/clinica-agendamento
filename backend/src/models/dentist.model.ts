export interface Dentist {
  id: number;
  email: string;
  password: string; // hashado com bcrypt
  name: string;
  speciality: string
}