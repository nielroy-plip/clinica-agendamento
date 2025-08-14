import { z } from 'zod';

export const appointmentSchema = z.object({
  paciente: z.string().min(3, { message: "Nome do paciente muito curto" }),
  data: z.coerce.date().min(new Date(), { message: "Data deve ser futura" }),
  procedimento: z.string().min(5, { message: "Procedimento deve ter pelo menos 5 caracters"})
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;