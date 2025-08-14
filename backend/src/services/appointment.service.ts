import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

//tipos para os dados de entrada
interface CreateAppointmentData {
  dataHora: string;
  pacienteId: number;
  dentistaId: number;
  procedimentoId: number;
  observacoes?: string;
  valor?: number;
  status?: string;
}

interface UpdateAppointmentData {
  dataHora?: string;
  pacienteId?: number;
  dentistaId?: number;
  procedimentoId?: number;
  observacoes?: string;
  valor?: number;
  status?: string;
}

interface AppointmentFilters {
  status?: string;
  pacienteId?: string;
  dentistaId?: string;
  procedimentoId?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
  limit?: string;
}

//função para criar agendamento
export const createAppointment = async (data: CreateAppointmentData ) => {
  try {
    //validar se paciente existe
    const patient = await prisma.patient.findUnique({
      where: {
        id: data.pacienteId
      }
    });
    if (!patient) {
      throw new Error('Paciente não encontrado');
    }

    // Validar se dentista existe
    const dentist = await prisma.user.findUnique({
      where: { id: data.dentistaId }
    });
    if (!dentist) {
      throw new Error('Dentista não encontrado');
    }

    // Validar se procedimento existe
    const procedure = await prisma.procedure.findUnique({
      where: { id: data.procedimentoId }
    });
    if (!procedure) {
      throw new Error('Procedimento não encontrado');
    }

    //verificar disponibilidade do horário
    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        dentistaId: data.dentistaId,
        dataHora: new Date(data.dataHora),
        status: {
          notIn: ['CANCELADO', 'FALTOU']
        }
      }
    });

    if (conflictingAppointment) {
      throw new Error('Horário não disponível para este dentista');
    }

    //criar o agendamento
    const appointment = await prisma.appointment.create({
      data: {
        dataHora: new Date(data.dataHora),
        pacienteId: data.pacienteId,
        dentistaId: data.dentistaId,
        procedimentoId: data.procedimentoId,
        observacoes: data.observacoes,
        valor: data.valor || procedure.valor,
        status: data.status || 'AGENDADO'
      },
      include: {
        paciente: {
          select: {
            id: true,
            nome: true,
            telefone: true,
            email: true
          }
        },
        dentista: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        },
        procedimento: {
          select: {
            id: true,
            nome: true,
            duracao: true,
            valor: true
          }
        }
      }
    });
    return appointment;
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    throw error;
  }
};

// função para listar agendamentos com filtros
export const getAppointments = async ( filters: AppointmentFilters = {}) => {
  try {
    const page = parseInt(filters.page || '1');
    const limit = parseInt(filters.limit || '10');
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.pacienteId) {
      where.pacienteId = parseInt(filters.pacienteId)
    }

    
    if (filters.dentistaId) {
      where.dentistaId = parseInt(filters.dentistaId)
    }

    
    if (filters.procedimentoId) {
      where.procedimentoId = parseInt(filters.procedimentoId)
    }

    // filtros de data
    if (filters.date) {
      const targetDate = new Date(filters.date);
      const nextDay = new Date(targetDate);
      nextDay.setDate(nextDay.getDate() + 1);

      where.dataHora = {
        gte: targetDate,
        lt: nextDay
      };
    } else if (filters.startDate && filters.endDate) {
      where.dataHora = {
        gte: new Date(filters.startDate),
        lte: new Date(filters.endDate)
      };
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        paciente: {
          select: {
            id: true,
            nome: true,
            telefone: true
          }
        },
        dentista: {
          select: {
            id: true,
            nome: true
          }
        },
        procedimento: {
          select: {
            id: true,
            nome: true,
            duracao: true
          }
        }
      },
        orderBy: {
          dataHora: 'asc'
        },
        skip,
        take: limit
    });

    return appointments;
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    throw error;
  }
};

// função para buscar agendamento por ID
export const getAppointmentById = async (id: number) => {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id
      },
      include: {
        paciente: true,
        dentista: {
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true
          }
        },
        procedimento: true
      }
    });

    return appointment;
  } catch (error) {
    console.error('Erro ao buscar agendamento por ID:', error);
    throw error;
  }
};

// função para atualizar agendamento
export const updateAppointment = async (id: number, data: UpdateAppointmentData) => {
  try {
    //verificar se agendamento existe
    const existingAppointment = await prisma.appointment.findUnique({
      where: {
        id
      }
    });

    if (!existingAppointment) {
      return null;
    }

    //se está alterando data/hora ou dentista, verificar disponibilidade
    if (data.dataHora || data.dentistaId) {
      const newDateTime = data.dataHora ? new Date(data.dataHora) : existingAppointment.dataHora;
      const newDentistaId = data.dentistaId || existingAppointment.dentistaId;

      const conflictingAppointment = await prisma.appointment.findFirst({
        where: {
          id: {
            not: id
          },
          dentistaId: newDentistaId,
          dataHora: newDateTime,
          status: {
            notIn: ['CANCELADO', 'FALTOU']
          }
        }
      });

      if (conflictingAppointment) {
        throw new Error('Horário não disponível para este dentista');
      }
    }

    const updateData: any = {};

      if (data.dataHora) updateData.dataHora = new Date(data.dataHora);
      if (data.pacienteId) updateData.pacienteId = data.pacienteId;
      if (data.dentistaId) updateData.dentistaId = data.dentistaId;
      if (data.procedimentoId) updateData.procedimentoId = data.procedimentoId;
      if (data.observacoes !== undefined) updateData.observacoes = data.observacoes;
      if (data.valor !== undefined) updateData.valor = data.valor;
      if (data.status) updateData.status = data.status;

      const updatedAppointment = await prisma.appointment.update({
        where: { 
          id
         },
         data: updateData,
         include: {
          paciente: {
            select: {
              id: true,
              nome: true,
              telefone: true
            }
          },
          dentista: {
            select: {
              id: true,
              nome: true
            }
          },
          procedimento: {
            select: {
              id: true,
              nome: true,
              duracao: true
            }
          }
         }
      });

      return updatedAppointment;
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    throw error;
  }
};

//função para deletar/cancelar agendamento
export const deleteAppointment = async (id: number) => {
  try {
    const existingAppointment = await prisma.appointment.findUnique({
      where: {
        id
      }
    });

    if (!existingAppointment) {
      return null;
    }

    const canceledAppointment = await prisma.appointment.update({
      where: {
        id
      },
      data: {
        status: 'CANCELADO',
        observacoes: existingAppointment.observacoes
          ? `${existingAppointment.observacoes}\n[CANCELADO em ${new Date().toLocaleString()}]`
          : `[CANCELADO em ${new Date().toLocaleString()}]`
      } 
    });

    return canceledAppointment;
  } catch (error) {
    console.error('Erro ao cancelar agendamento:', error);
    throw error;
  }
};

// Novos serviços

export const updateAppointmentStatus = async (id: number, status: string, observacoes?: string) => {
  try {
    const existingAppointment = await prisma.appointment.findUnique({
      where: { id }
    });

    if (!existingAppointment) {
      return null;
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: { 
        status,
        observacoes: observacoes || existingAppointment.observacoes
      },
      include: {
        paciente: { select: { id: true, nome: true } },
        dentista: { select: { id: true, nome: true } },
        procedimento: { select: { id: true, nome: true } }
      }
    });

    return updatedAppointment;
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    throw error;
  }
};

// Buscar agendamentos por paciente
export const getAppointmentsByPatient = async (patientId: number) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { pacienteId: patientId },
      include: {
        dentista: { select: { id: true, nome: true } },
        procedimento: { select: { id: true, nome: true, duracao: true } }
      },
      orderBy: { dataHora: 'desc' }
    });

    return appointments;
  } catch (error) {
    console.error('Erro ao buscar agendamentos do paciente:', error);
    throw error;
  }
};

// Buscar agendamentos por dentista
export const getAppointmentsByDentist = async (dentistId: number) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { dentistaId: dentistId },
      include: {
        paciente: { select: { id: true, nome: true, telefone: true } },
        procedimento: { select: { id: true, nome: true, duracao: true } }
      },
      orderBy: { dataHora: 'asc' }
    });

    return appointments;
  } catch (error) {
    console.error('Erro ao buscar agendamentos do dentista:', error);
    throw error;
  }
};

// Buscar agendamentos por data
export const getAppointmentsByDate = async (date: string) => {
  try {
    const targetDate = new Date(date);
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const appointments = await prisma.appointment.findMany({
      where: {
        dataHora: {
          gte: targetDate,
          lt: nextDay
        }
      },
      include: {
        paciente: { select: { id: true, nome: true, telefone: true } },
        dentista: { select: { id: true, nome: true } },
        procedimento: { select: { id: true, nome: true, duracao: true } }
      },
      orderBy: { dataHora: 'asc' }
    });

    return appointments;
  } catch (error) {
    console.error('Erro ao buscar agendamentos por data:', error);
    throw error;
  }
};