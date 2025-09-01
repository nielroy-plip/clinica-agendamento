import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Calendar, 
  Clock,
  Shield,
  Smile,
  Zap,
  Star,
  Heart,
  Award,
  CheckCircle,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

interface AgendamentoData {
  servico: string;
  profissional: string;
  data: string;
  horario: string;
  pacienteInfo: {
    nome: string;
    email: string;
    telefone: string;
    observacoes: string;
  };
}

interface Servico {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  icon: React.ElementType;
}

interface Profissional {
  id: string;
  name: string;
  specialty: string;
  description: string;
  avaliable: boolean;
}

const Agendamento: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [agendamentoData, setAgendamentoData] = useState<AgendamentoData> ({
    servico: '',
    profissional: '',
    data: '',
    horario: '',
    pacienteInfo: {
      nome: '',
      email: '',
      telefone: '',
      observacoes: ''
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const servicos: Servico[] = [
     {
      id: 'clinica-geral',
      name: 'Clínica Geral',
      description: 'Consulta de rotina',
      price: 'R$ 80',
      duration: '45 min',
      icon: Shield
    },
    {
      id: 'ortodontia',
      name: 'Ortodontia',
      description: 'Consulta ortodôntica',
      price: 'R$ 150',
      duration: '60 min',
      icon: Smile
    },
    {
      id: 'implantodontia',
      name: 'Implantodontia',
      description: 'Avaliação para implante',
      price: 'R$ 120',
      duration: '90 min',
      icon: Zap
    },
    {
      id: 'estetica-dental',
      name: 'Estética Dental',
      description: 'Consulta estética',
      price: 'R$ 100',
      duration: '60 min',
      icon: Star
    }
  ];

  const profissionais: Profissional[] = {
    {
      id: 'dr-carlos',
      name: 'Dr. Carlos Silva',
      specialty: 'Diretor Clínico',
      description: 'Especialista em Implantodontia e Prótese',
      available: true
    },
    {
      id: 'dra-ana',
      name: 'Dra. Ana Costa',
      specialty: 'Ortodontista',
      description: 'Especialista em Ortodontia e Ortopedia Facial',
      available: true
    },
    {
      id: 'dr-pedro',
      name: 'Dr. Pedro Santos',
      specialty: 'Endodontista',
      description: 'Especialista em Endodontia e Clínica Geral',
      available: false
    }
  ];

  const horarios = [
    '08:00', '08:30', '10:00', '10:30', '14:00', '14:30', '15:00', '15:30', '16:00'
  ];

  const steps = [
    { number: 1, title: 'Escolha o Serviço', description: 'Selecione o tipo de consulta' },
    { number: 2, title: 'Escolha o Profissional', description: 'Selecione o dentista' },
    { number: 3, title: 'Escolha Data e Horário', description: 'Defina quando será a consulta' },
    { number: 4, title: 'Seus Dados', description: 'Informe seus dados pessoais' }
  ];

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleServicoSelect = (servicoId: string) => {
    setAgendamentoData(prev => ({ ...prev, servico: servicoId }));
  };

  const handleProfissionalSelect = (profissionalId: string) => {
    setAgendamentoData(prev => ({ ...prev, profissional: profissionalId }));
  };

  const handleDataChange = (data: string) => {
    setAgendamentoData(prev => ({ ...prev, data }));
  };

  const handleHorarioSelect = (horario: string) => {
    setAgendamentoData(prev => ({ ...prev, horario }));
  };

  const handlePacienteInfoChange = (field: string, value: string) => {
    setAgendamentoData(prev => ({
      ...prev,
      pacienteInfo: { ...prev.pacienteInfo, [field]: value }
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulação de envio para API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
    }, 2000);
  };

  const getSelectedServico = () => servicos.find(s => s.id === agendamentoData.servico);
  const getSelectedProfissional = () => profissionais.find(p => p.id === agendamentoData.profissional);

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!agendamentoData.servico;
      case 2: return !!agendamentoData.profissional;
      case 3: return !!agendamentoData.data && !!agendamentoData.horario;
      case 4: return !!(agendamentoData.pacienteInfo.nome && agendamentoData.pacienteInfo.email && agendamentoData.pacienteInfo.telefone);
      default: return false;
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Agendamento Confirmado!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Seu agendamento foi realizado com sucesso. Você receberá uma confirmação por e-mail.
            </p>

            {/* Resumo do Agendamento */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left max-w-md mx-auto">
              <h3 className="font-semibold text-gray-900 mb-4">Detalhes do Agendamento:</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Serviço:</span>
                  <span className="font-medium">{getSelectedServico()?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Profissional:</span>
                  <span className="font-medium">{getSelectedProfissional()?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data:</span>
                  <span className="font-medium">{new Date(agendamentoData.data).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Horário:</span>
                  <span className="font-medium">{agendamentoData.horario}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Paciente:</span>
                  <span className="font-medium">{agendamentoData.pacienteInfo.nome}</span>
                </div>
              </div>
            </div>

            {/* Informações de Contato */}
            <div className="grid md:grid-cols-3 gap-4 mb-8 text-sm">
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>(11) 3456-7890</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>contato@inovatra.com.br</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Rua das Flores, 123</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setIsCompleted(false);
                  setCurrentStep(1);
                  setAgendamentoData({
                    servico: '',
                    profissional: '',
                    data: '',
                    horario: '',
                    pacienteInfo: { nome: '', email: '', telefone: '', observacoes: '' }
                  });
                }}
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Novo Agendamento
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Agendamento Online
          </h1>
          <p className="text-xl text-gray-600">
            Agende sua consulta de forma rápida e prática.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    currentStep >= step.number 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.number}
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-purple-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-400 hidden sm:block">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 rounded transition-colors ${
                    currentStep > step.number ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Step 1: Escolha do Serviço */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                1. Escolha o Serviço
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {servicos.map((servico) => (
                  <div
                    key={servico.id}
                    onClick={() => handleServicoSelect(servico.id)}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg ${
                      agendamentoData.servico === servico.id
                        ? 'border-purple-600 bg-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        agendamentoData.servico === servico.id ? 'bg-purple-600' : 'bg-purple-100'
                      }`}>
                        <servico.icon className={`w-6 h-6 ${
                          agendamentoData.servico === servico.id ? 'text-white' : 'text-purple-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {servico.name}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {servico.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-purple-600 font-semibold">
                            {servico.price}
                          </span>
                          <span className="text-gray-500">
                            {servico.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Escolha do Profissional */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                2. Escolha o Profissional
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {profissionais.map((prof) => (
                  <div
                    key={prof.id}
                    onClick={() => prof.available && handleProfissionalSelect(prof.id)}
                    className={`border-2 rounded-xl p-6 transition-all text-center ${
                      !prof.available 
                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                        : agendamentoData.profissional === prof.id
                          ? 'border-purple-600 bg-purple-50 shadow-lg cursor-pointer'
                          : 'border-gray-200 hover:border-purple-300 cursor-pointer hover:shadow-lg'
                    }`}
                  >
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      agendamentoData.profissional === prof.id ? 'bg-purple-600' : 'bg-purple-100'
                    }`}>
                      <User className={`w-10 h-10 ${
                        agendamentoData.profissional === prof.id ? 'text-white' : 'text-purple-600'
                      }`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {prof.name}
                    </h3>
                    <p className="text-purple-600 font-medium mb-2">
                      {prof.specialty}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      {prof.description}
                    </p>
                    {!prof.available && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        Indisponível
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Escolha Data e Horário */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                3. Escolha Data e Horário
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Data */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Data
                  </label>
                  <input
                    type="date"
                    value={agendamentoData.data}
                    onChange={(e) => handleDataChange(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {/* Horário */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Horário
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {horarios.map((horario) => (
                      <button
                        key={horario}
                        onClick={() => handleHorarioSelect(horario)}
                        className={`p-3 text-sm font-medium rounded-lg transition-all ${
                          agendamentoData.horario === horario
                            ? 'bg-purple-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-600'
                        }`}
                      >
                        {horario}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Dados do Paciente */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                4. Seus Dados
              </h2>
              
              {/* Resumo do Agendamento */}
              <div className="bg-purple-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Resumo do Agendamento:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Serviço: </span>
                    <span className="font-medium">{getSelectedServico()?.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Profissional: </span>
                    <span className="font-medium">{getSelectedProfissional()?.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Data: </span>
                    <span className="font-medium">{new Date(agendamentoData.data).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Horário: </span>
                    <span className="font-medium">{agendamentoData.horario}</span>
                  </div>
                </div>
              </div>

              {/* Formulário de Dados */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={agendamentoData.pacienteInfo.nome}
                    onChange={(e) => handlePacienteInfoChange('nome', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    value={agendamentoData.pacienteInfo.email}
                    onChange={(e) => handlePacienteInfoChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    value={agendamentoData.pacienteInfo.telefone}
                    onChange={(e) => handlePacienteInfoChange('telefone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações
                  </label>
                  <textarea
                    value={agendamentoData.pacienteInfo.observacoes}
                    onChange={(e) => handlePacienteInfoChange('observacoes', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                    rows={3}
                    placeholder="Alguma observação importante..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próximo
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="flex items-center px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Confirmando...
                  </>
                ) : (
                  'Confirmar Agendamento'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agendamento;