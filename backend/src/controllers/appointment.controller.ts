import { Request, Response } from 'express';
import { 
  createAppointment as createAppointmentService,
  getAppointments as getAppointmentsService, 
  getAppointmentById as getAppointmentByIdService, 
  updateAppointment as updateAppointmentService, 
  deleteAppointment as deleteAppointmentService,
  getAppointmentsByPatient as getAppointmentsByPatientService,
  getAppointmentsByDentist as getAppointmentsByDentistService,
  getAppointmentsByDate as getAppointmentsByDateService,
  updateAppointmentStatus as updateAppointmentStatusService
} from '../services/appointment.service';
import { AppointmentInput } from '../types/appointment'

export const create = async (req: Request, res: Response) => {
  const { body } = req as { body: AppointmentInput[] };
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await createAppointmentService (req.body);
    
    res.status(201).json({
      status: 'success',
      message: 'Agendamento criado com sucesso',
      data: appointment
    });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    
    if (error instanceof Error) {

      if (error.message.includes('Paciente não encontrado')) {
        return res.status(404).json({
          status: 'fail',
          message: 'Paciente não encontrado'
        });
      }
      
      if (error.message.includes('Horário não disponível')) {
        return res.status(409).json({
          status: 'fail',
          message: 'Horário já está ocupado'
        });
      }
    }

    res.status(500).json({
      status: 'error',
      message: 'Erro interno ao criar agendamento'
    });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const filters = req.query;
    const appointments = await getAppointmentsService(filters);
      
      res.status(200).json({
        status: 'success',
        results: appointments.length,
        data: appointments,
        pagination: {
          page: Number(filters.page) || 1,
          limit: Number(filters.limit) || 10,
          total: appointments.length
        }
      });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erro ao buscar agendamentos'
    });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  console.log('Params:', req.params);
  const id = Number(req.params.id);
  console.log('ID convertido:', id);

  if (isNaN(id)) {
    return res.status(400).json({ 
      status: 'fail', 
      message: 'ID inválido' });
  }

  try {
    const appointment = await getAppointmentByIdService(id);
    console.log('Appointment encontrado:', appointment); 

    if (!appointment) {
      return res.status(404).json({ 
        status: 'fail', 
        message: 'Agendamento não encontrado' });
    }

    res.status(200).json({ 
      status: 'success', 
      data: appointment });
  } catch (error) {
    console.error('Erro ao buscar agendamento:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Erro ao buscar agendamento' });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'ID inválido'
      });
    }

    const updateAppointment = await updateAppointmentService(id, req.body);

    if (!updateAppointment) {
      return res.status(404).json({
        status: 'fail',
        message: 'Agendamento não encontrado'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Agendamento atualizado com sucesso',
      data: updateAppointment
    });
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);

    if (error instanceof Error && error.message.includes('Horário não disponível')) {
      return res.status(409).json({
        status: 'fail',
        message: 'Horário já está ocupado'
      });
    }
    res.status(500).json({
      status: 'error',
      message: 'Erro ao atualizar agendamento'
    });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'ID inválido'
      });
    }

    const deleted = await deleteAppointmentService(id);

    if (!deleted) {
      return res.status(404).json({
        status: 'fail',
        message: 'Agendamento não encontrado'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Agendamento cancelado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao cancelar agendamento:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao cancelar agendamento'
    });
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status, observacoes } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'ID inválido'
      });
    }

    const updatedAppointment = await updateAppointmentStatusService( id, status, observacoes );

    if (!updatedAppointment) {
      return res.status(404).json({
        status: 'fail',
        message: 'Agendamento não encontrado'
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Status alterado para ${status}`,
      data: updatedAppointment
    });
  } catch (error) {
    console.error('Erro ao atualizar status do agendamento:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao atualizar status do agendamento'
    });
  }
};

export const getAppointmentsByPatient = async (req: Request, res: Response) => {
  try {
    const patientId = Number(req.params.patientId);
    
    if (isNaN(patientId)) {
      return res.status(400).json({
        status: 'fail',
        message: 'ID do paciente inválido'
      });
    }

    const appointments = await getAppointmentsByPatientService(patientId);
    
    res.status(200).json({
      status: 'success',
      results: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error('Erro ao buscar agendamentos do paciente:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao buscar agendamentos do paciente'
    });
  }
};

export const getAppointmentsByDentist = async (req: Request, res: Response) => {
  try {
    const dentistId = Number(req.params.dentistId);
    
    if (isNaN(dentistId)) {
      return res.status(400).json({
        status: 'fail',
        message: 'ID do dentista inválido'
      });
    }

    const appointments = await getAppointmentsByDentistService(dentistId);
    
    res.status(200).json({
      status: 'success',
      results: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error('Erro ao buscar agendamentos do dentista:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao buscar agendamentos do dentista'
    });
  }
};

export const getAppointmentsByDate = async (req: Request, res: Response) => {
  try {
    const date = req.params.date;
    
    // Validação básica de formato de data
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Formato de data inválido. Use YYYY-MM-DD'
      });
    }

    const appointments = await getAppointmentsByDateService(date);
    
    res.status(200).json({
      status: 'success',
      results: appointments.length,
      data: appointments,
      date: date
    });
  } catch (error) {
    console.error('Erro ao buscar agendamentos por data:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao buscar agendamentos da data especificada'
    });
  }
};