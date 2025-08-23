import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: '',
    dentist: '',
    date: '',
    time: '',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    patientCpf: ''
  });
  const [avaliableTimes, setAvaliableTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { user } = useAuth();

  const services = [
    { name: 'Clinica Geral', price: 80, description: 'Consulta de rotina' },
    { name: 'Ortodontia', price: 150, description: 'Consulta ortodôntica' },
    { name: 'Implantodontia', price: 120, description: 'Avaliação para implante' },
    { name: 'Estética Dental', price: 100, description: 'Consulta estética' }
  ];

  const dentists = [
    { name: 'Dr. Carlos Silva', specialty: 'Diretor Clínico'},
    { name: 'Dr. Ana Costa', specialty: 'Ortodontista'},
    { name: 'Dr. Pedro Santos', specialty: 'Endodontista'}
  ];

  const handleServiceSelect = (service) => {
    setBookingData({ ...bookingData, service });
    setCurrentStep(2);
  };

  const handleDentistSelect = (dentist) => {
    setBookingData({ ...bookingData, dentist });
    setCurrentStep(3);
  };

  const handleDateSelect = async (date) => {
    setBookingData({ ...bookingData, date });

    // Simular busca de horários disponíveis
    setLoading(true);
    try {
      // Em produção, buscar horários disponíveis da API
      const times = ['09:00', '09:30', '10:00', '10:30', '14:00', '14:30', '15:00', '15:30', '16:00'];
      setAvaliableTimes(times);
    } catch (error) {
      setError('Erro ao carregar horários disponíveis');
    }
    setLoading(false);
  };

  const handleTimeSelect = (time) => {
    setBookingData({ ...bookingData, time });
    setCurrentStep(4);
  };

  const handlePatientInfoSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(5);
  };

  const handleBookingSubmit = async () => {
    setLoading(true);
    try {
      // Em produção, enviar os dados para a API
      await api.post('/appointments', {
        patient: bookingData.patientName,
        email: bookingData.patientEmail,
        phone: bookingData.patientPhone,
        cpf: bookingData.patientCpf,
        service: bookingData.service,
        dentist: bookingData.dentist,
        date: `${bookingData.date}T${bookingData.time}:00`,
        procedure: bookingData.service
      });

      setSuccess(true);
    } catch (error) {
      setError('Erro ao agendar consulta. Tente novamente.');
    }
    setLoading(false);
  };

   if (success) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Agendamento Confirmado!</h2>
            <p className="text-gray-600 mb-6">
              Sua consulta foi agendada com sucesso. Você receberá um email de confirmação em breve.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                setCurrentStep(1);
                setBookingData({
                  service: '',
                  dentist: '',
                  date: '',
                  time: '',
                  patientName: '',
                  patientEmail: '',
                  patientPhone: '',
                  patientCpf: ''
                });
              }}
              className="btn-primary px-6 py-3 rounded-lg"
            >
              Fazer Novo Agendamento
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Agendamento Online</h1>
          <p className="text-xl text-gray-600">Agende sua consulta de forma rápida e prática</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Steps Indicator */}
          <div className="flex justify-center mb-8">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 5 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      currentStep > step ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">1. Escolha o Serviço</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.name}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      bookingData.service === service.name
                        ? 'border-primary bg-primary-light'
                        : 'border-gray-200 hover:border-primary'
                    }`}
                    onClick={() => handleServiceSelect(service.name)}
                  >
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                    <p className="text-primary font-semibold">R$ {service.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Dentist Selection */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">2. Escolha o Profissional</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {dentists.map((dentist) => (
                  <div
                    key={dentist.name}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      bookingData.dentist === dentist.name
                        ? 'border-primary bg-primary-light'
                        : 'border-gray-200 hover:border-primary'
                    }`}
                    onClick={() => handleDentistSelect(dentist.name)}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-light rounded-full mx-auto mb-3 flex items-center justify-center">
                        <span className="text-2xl">👨‍⚕️</span>
                      </div>
                      <h3 className="font-semibold">{dentist.name}</h3>
                      <p className="text-gray-600 text-sm">{dentist.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setCurrentStep(1)}
                className="mt-6 px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Voltar
              </button>
            </div>
          )}

          {/* Step 3: Date and Time Selection */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">3. Escolha Data e Horário</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => handleDateSelect(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horário
                  </label>
                  {loading ? (
                    <div className="text-center py-4">
                      <p>Carregando horários disponíveis...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => handleTimeSelect(time)}
                          className={`p-2 border rounded text-sm ${
                            bookingData.time === time
                              ? 'border-primary bg-primary text-white'
                              : 'border-gray-300 hover:border-primary'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Voltar
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Patient Information */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">4. Dados Pessoais</h2>
              <form onSubmit={handlePatientInfoSubmit} className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={bookingData.patientName}
                    onChange={(e) => setBookingData({ ...bookingData, patientName: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CPF
                  </label>
                  <input
                    type="text"
                    value={bookingData.patientCpf}
                    onChange={(e) => setBookingData({ ...bookingData, patientCpf: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="000.000.000-00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={bookingData.patientPhone}
                    onChange={(e) => setBookingData({ ...bookingData, patientPhone: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={bookingData.patientEmail}
                    onChange={(e) => setBookingData({ ...bookingData, patientEmail: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div className="md:col-span-2 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Próximo
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">5. Confirmação</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-4">Resumo do Agendamento</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Serviço:</span>
                    <span>{bookingData.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Profissional:</span>
                    <span>{bookingData.dentist}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Data:</span>
                    <span>{new Date(bookingData.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Horário:</span>
                    <span>{bookingData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Paciente:</span>
                    <span>{bookingData.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Telefone:</span>
                    <span>{bookingData.patientPhone}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Voltar
                </button>
                <button
                  onClick={handleBookingSubmit}
                  disabled={loading}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {loading ? 'Confirmando...' : 'Confirmar Agendamento'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;