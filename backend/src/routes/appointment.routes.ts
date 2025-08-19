
import { Router } from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByPatient,
  getAppointmentsByDentist,
  getAppointmentsByDate,
  updateAppointmentStatus
} from '../controllers/appointment.controller';
import { validate } from '../validations/validation.middleware';
import { 
  appointmentSchema, 
  updateAppointmentSchema,
  appointmentStatusSchema} from '../validations/appointment.schema';
import { appointmentQuerySchema } from '../validations/appointment.schema';
import { appointmentSchemaType } from '../types/appointment';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

//rota principal para criar agendamento
router.post('/', validate(appointmentSchema, 'body'), createAppointment);

//rota para listar agendamentos com filtros opcionais
router.get('/', validate(appointmentQuerySchema, 'query'), getAppointments);

//rota para buscar agendamento específico por ID
router.get('/:id', getAppointmentById);

//rota para atualizar agendamento completo
router.put('/:id', validate(updateAppointmentSchema, 'body'), updateAppointment);

//rota específica para atualizar apenas o estatus do agendamento
router.patch('/:id/status', validate(appointmentStatusSchema, 'body'), updateAppointmentStatus);

//rota para deletar agendamento
router.delete('/:id', deleteAppointment);

// ROTAS DE FILTRO ESPECÍFICOS

//buscat agendamentos por paciente
router.get('/patient/:patientId', getAppointmentsByPatient);

//buscar agendamentos por data específica
router.get('/date/:date', getAppointmentsByDate);

//middleware de validação
router.post('/', validate(appointmentSchemaType, 'body'), createAppointment)

// rota de autenticação
router.post('/', authenticate, createAppointment);
router.get('/', authenticate, getAppointments);

export default router;