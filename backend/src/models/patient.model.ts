export interface Pacient {
  id: number;
  email: string;
  password: string; // hashado com bcrypt
  name: string;
  phone: string;
}