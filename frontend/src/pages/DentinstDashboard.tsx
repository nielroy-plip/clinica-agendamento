import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const DentistDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('agenda');
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
      // Em produção, a API vai buscar os agendamentos do dentista
      const response = await api.get('/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
      // Dados para demonstração
      setAppointments([
        {
          id: 1,
          patient: 'Maria Silva',
          service: 'Clínica Geral - Limpeza',
          date: '2024-12-10T09:00:00',
          status: 'Confirmado'
        },
        {
          id: 2,
          patient: 'João Santos',
          service: 'Endodontia - Tratamento de Canal',
          date: '2024-12-10T10:00:00',
          status: 'Pendente'
        },
        {
          id: 3,
          patient: 'Ana Costa',
          service: 'Ortodontia - Manutenção',
          date: '2024-12-10T14:30:00',
          status: 'Confirmado'
        }
      ]);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleConfirmAppointment = async (appointmentId) => {
    try {
      await api.patch(`/api/appointments/${appointmentId}`, { status: 'Confirmado' });
      setAppointments(appointments.map(apt => 
        apt.id === appointmentId ? { ...apt, status: 'Confirmado' } : apt
      ));
      alert('Consulta confirmada com sucesso!');
    } catch (error) {
      console.error('Erro ao confirmar consulta:', error);
      alert('Erro ao confirmar consulta. Tente novamente.');
    }
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
          <h1 className="text-3xl font-bold text-gray-800">Painel do Dentista</h1>
          <button
            onClick={handleLogout}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Sair
          </button>
        </div>

        {/* Abas do Painel */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['agenda', 'pacientes', 'financeiro', 'estoque'].map((tab) => (
                <button
                  key={tab}
                  className={`py-4 px-2 border-b-2 font-medium ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'agenda' && 'Agenda'}
                  {tab === 'pacientes' && 'Pacientes'}
                  {tab === 'financeiro' && 'Financeiro'}
                  {tab === 'estoque' && 'Estoque'}
                </button>
              ))}
            </nav>
          </div>

          {/* Conteúdo das Abas */}
          <div className="p-6">
            {activeTab === 'agenda' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Agenda de Hoje - {new Date().toLocaleDateString('pt-BR')}</h2>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="dashboard-card p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{appointment.patient}</h3>
                          <p className="text-gray-600">{appointment.service}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(appointment.date).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          {appointment.status === 'Pendente' && (
                            <button
                              onClick={() => handleConfirmAppointment(appointment.id)}
                              className="text-green-600 hover:text-green-800 text-sm"
                            >
                              Confirmar
                            </button>
                          )}
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            Reagendar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'pacientes' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Lista de Pacientes</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-center">
                    Funcionalidade em desenvolvimento. Em breve você poderá gerenciar seus pacientes aqui.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'financeiro' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Resumo Financeiro</h2>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="dashboard-card p-4 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-green-600">R$ 12.450</h3>
                    <p className="text-gray-600">Recebido</p>
                  </div>
                  <div className="dashboard-card p-4 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-yellow-600">R$ 3.200</h3>
                    <p className="text-gray-600">Pendente</p>
                  </div>
                  <div className="dashboard-card p-4 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-red-600">R$ 2.800</h3>
                    <p className="text-gray-600">Despesas</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'estoque' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Controle de Estoque</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Anestésico Lidocaína</p>
                      <p className="text-sm text-gray-500">Medicamentos</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold stock-low">5 unidades</p>
                      <p className="text-xs text-red-600">Estoque baixo!</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Luvas Descartáveis</p>
                      <p className="text-sm text-gray-500">EPI</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold stock-ok">150 unidades</p>
                      <p className="text-xs text-green-600">Estoque OK</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-primary">8</h3>
            <p className="text-gray-600">Consultas Hoje</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-primary">32</h3>
            <p className="text-gray-600">Esta Semana</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-primary">28</h3>
            <p className="text-gray-600">Próxima Semana</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentistDashboard;