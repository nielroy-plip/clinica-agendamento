import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchAppointments();
  }, [user, navigate]);

  const fetchAppointments = async () => {
    try {
      // em produção, buscar os agendamentos do paciente
      const response = await api.get('/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
      // Dados para demonstração
      setAppointments([
        {
          id: 1,
          service: 'Clinica Geral',
          dentist: 'Dr. Carlos Silva',
          date: '2024-12-15T14:30:00',
          status: 'Agendado'
        },
        {
          id: 2,
          service: 'Ortodontia',
          dentist: 'Dr. Ana Costa',
          date: '2024-08-22T14:30:00',
          status: 'Agendado'
        }
      ]);
    }
    setLoading(false);
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (window.comfirm('Tem certeza que deseja cancelar este agendamento ?')) {
      try {
        await api.delete(`/api/appointments/${appointmentId}`);
        setAppointments(appointments.filter(apt => apt.id !== appointmentId));
        alert('Agendamento cancelado com sucesso!');
      } catch (error) {
        console.error('Erro ao cancelar agendamento:', error);
        alert('Erro ao cancelar agendamento. Tente novamente.');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Área do Paciente</h1>
          <button
            onClick={handleLogout}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Sair
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Consultas Agendadas</h2>
              {appointments.length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  Nenhuma consulta agendada.{' '}
                  <Link to="/booking" className="text-primary hover:underline">
                    Agende sua primeira consulta
                  </Link>
                </p>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border-l-4 border-primary pl-4 py-3 bg-gray-50 rounded-r-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{appointment.service}</h3>
                          <p className="text-gray-600">{appointment.dentist}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(appointment.date).toLocaleDateString('pt-BR')} às{' '}
                            {new Date(appointment.date).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                          <span className={`text-sm font-medium ${
                            appointment.status === 'Agendado' ? 'text-green-600' : 'text-gray-600'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            Reagendar
                          </button>
                          <button
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Histórico de Atendimentos</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <span className="font-medium">Limpeza Dental</span>
                    <span className="text-gray-500 ml-2">Dr. Carlos Silva</span>
                  </div>
                  <span className="text-sm text-gray-500">28/11/2024</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <span className="font-medium">Consulta Ortodôntica</span>
                    <span className="text-gray-500 ml-2">Dra. Ana Costa</span>
                  </div>
                  <span className="text-sm text-gray-500">15/11/2024</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <span className="font-medium">Restauração</span>
                    <span className="text-gray-500 ml-2">Dr. Carlos Silva</span>
                  </div>
                  <span className="text-sm text-gray-500">02/11/2024</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
              <div className="space-y-3">
                <Link
                  to="/booking"
                  className="w-full btn-primary text-white py-3 rounded-lg font-semibold block text-center"
                >
                  Nova Consulta
                </Link>
                <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                  Meus Dados
                </button>
                <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                  Documentos
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nome:</span>
                  <span className="font-medium">{user?.name || 'Paciente'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{user?.email || 'paciente@exemplo.com'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Telefone:</span>
                  <span className="font-medium">(11) 99999-9999</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;