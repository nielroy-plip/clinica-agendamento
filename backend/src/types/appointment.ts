import { z } from 'zod';

const isBusinessHours = (date: Date) => {
  const hours = date.getHours();
  return hours >= 8 && hours <= 18; //8h às 18h
};

export const appointmentSchemaType = z.object({
  paciente: z.string().min(3, { message: "Nome do paciente muito curto" }),
  data: z.coerce.date().min(new Date(), "Data deve ser futura").refine(date => isBusinessHours(date),
    {message: "Agendamento apenas entre 8h e 18h"}),
  procedimento: z.string().min(5, { message: "Procedimento deve ter pelo menos 5 caracters"})
});



//resposta da API
export type AppointmentResponse = {
  id: number;
  paciente: string;
  data: string; 
  procedimento: string;
  createdAt: string;
};

//filtros de busca
export type AppointmentFilter = {
  paciente?: string;
  startDate?: Date;
  endDate?: Date;
};

export type AppointmentInput = z.infer<typeof appointmentSchemaType>;