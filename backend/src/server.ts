import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'
import appointmentRouter from './routes/appointment.routes';
import { errorHandler } from './middlewares/errorHandler';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
});

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares básicos
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' })); //limite para uploads
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next) => {
  (req as any).prisma = prisma;
  next()
});

// Rota de teste
app.get('/', async (req: Request, res: Response) => {
  try {
    await prisma.$connect();

    res.status(200).json({
    status: 'success',
    message: 'API da Clínica Odontológica',
    version: '1.0.0.b',
    database: 'connected',
    endpoint: {
      appointments: '/api/appointments',
      patients: '/api/patients',
      procedures: '/api/procedures',
      users: '/api/users'
    }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erro na conexão com o banco de dados',
      database: 'disconnected'
    });
  }
});

app.get('/health', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealtly',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Rota POST temporária
app.post('/api/appointments', (req, res) => {
  const {paciente, data, procedimento} = req.body;

  //validaçãoi básica
  if (!paciente || !data || !procedimento) {
    return res.status(400).json({
      success: false,
      error: 'Dados incompletos. Campos obrigatórios: paciente, data, procedimento'
    });
  }

  try {
    //novo schema
    /**
     * const appointment = await prisma.appointment.create({
     * data: {
     * dataHora: new Data(data),
     * status: 'AGENDADO',
     * pacienteId: paciente.id,
     * dentistaId: procedimento.dentistaId,
     * procedimentoId: procedimento.id,
     * valor: procedimento.valor
     * },
     * include: {
     * paciente: true,
     * dentista: true,
     * procedimento: true
     * }
     * });
     */

  res.status(201).json({
    success: true,
    appointment: { paciente, data, procedimento }
  });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro interno no servidor'
    });
  }
});

// rotas principais
app.use('/api/appointments', appointmentRouter);
// Rotas quando estiverem prontas
// app.use('/api/patients', patientRouter);
// app.use('/api/procedures', procedureRouter);
// app.use('/api/users', userRouter)

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `Rota ${req.originalUrl} não encontrada`,
    avaliableEndpoints: [
      'GET /',
      'GET /health',
      'POST /api/appointments/temp',
      'GET /api/appointments'
    ]
  });
});



//middleware de tratamento de erros
app.use(errorHandler); 

// função para graceful shutdown
const gracefulShutdown = async (signal: string) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);

  try {
    await prisma.$disconnect();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.log('Error during shutdown', error);
    process.exit(1);
  }
};

//Listener para graceful shutdown
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

//inicialização do servidor com tratamento de erro
const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Conexão com banco de dados estabelecida');

     app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Health check disponível em http://localhost:${PORT}/health`);
    });

  } catch (error) {
    console.error('Erro na conexão com banco de dados', error);

  }
};

startServer().catch((error) => {
  console.error('Erro ao iniciar servidor:', error);
  process.exit(1);
});

export { app, prisma };
