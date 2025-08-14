import { z } from 'zod';

// Schema principal para criar agendamento
export const appointmentSchema = z.object({
  dataHora: z.string().regex(
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|([+-]\d{2}:\d{2}))$/,
  "Data/hora deve estar no formato ISO"),
  pacienteId: z.number().int().positive("ID do paciente deve ser um número positivo"),
  dentistaId: z.number().int().positive("ID do dentista deve ser um número positivo"), 
  procedimentoId: z.number().int().positive("ID do procedimento deve ser um número positivo"),
  observacoes: z.string().optional(),
  valor: z.number().positive("Valor deve ser positivo").optional(),
  status: z.enum(['AGENDADO', 'CONFIRMADO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO', 'FALTOU'])
    .default('AGENDADO')
});

// Schema para atualização (todos os campos opcionais exceto validações)
export const updateAppointmentSchema = appointmentSchema.partial();

// Schema específico para atualizar status
export const appointmentStatusSchema = z.object({
  status: z.enum(['AGENDADO', 'CONFIRMADO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO', 'FALTOU']),
  observacoes: z.string().optional()
});

// Schema para validar query parameters na listagem
export const appointmentQuerySchema = z.object({
  status: z.enum(['AGENDADO', 'CONFIRMADO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO', 'FALTOU']).optional(),
  pacienteId: z.string().transform(Number).pipe(z.number().positive()).optional(),
  dentistaId: z.string().transform(Number).pipe(z.number().positive()).optional(),
  procedimentoId: z.string().transform(Number).pipe(z.number().positive()).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD").optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  page: z.string().transform(Number).pipe(z.number().positive()).default(1),
  limit: z.string().transform(Number).pipe(z.number().positive().max(100)).default(10)
});

// Schema para parâmetros de rota
export const appointmentParamsSchema = z.object({
  id: z.string().transform(Number).pipe(z.number().positive("ID deve ser um número positivo")),
});

export const patientParamsSchema = z.object({
  patientId: z.string().transform(Number).pipe(z.number().positive("ID do paciente deve ser um número positivo")),
});

export const dentistParamsSchema = z.object({
  dentistId: z.string().transform(Number).pipe(z.number().positive("ID do dentista deve ser um número positivo")),
});

export const dateParamsSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),
});

// Tipos TypeScript gerados automaticamente
export type CreateAppointmentData = z.infer<typeof appointmentSchema>;
export type UpdateAppointmentData = z.infer<typeof updateAppointmentSchema>;
export type AppointmentStatusData = z.infer<typeof appointmentStatusSchema>;
export type AppointmentQueryParams = z.infer<typeof appointmentQuerySchema>;