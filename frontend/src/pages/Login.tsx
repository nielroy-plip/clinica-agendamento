import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Shield,
  Calendar,
  Users,
  FileText,
  Settings,
  LogOut,
  Bell,
  Search
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'dentist' | 'recepcionist';
  avatar?: string;
}

const Login: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: ''
  });
  const [user, setUser] = useState<User | null>(null);

  // Simulação de usuários para demo
  const mockUsers: User[] = [
    {id: 1, name: 'Dr. Lucas Rosário', email: 'lucas@inovatra.com.br', role: 'admin'},
    {id: 2, name: 'Dra. Ana Costa', email: 'ana@inovatra.com.br', role: 'dentist'},
    {id: 3, name: 'Dr. Maria Santos', email: 'maria@inovatra.com.br', role: 'recepcionist'}
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Simulação Autenticação
  setTimeout(() => {
    const foundUser = mockUsers.find(u => u.email === loginForm.email);
    if (foundUser && loginForm.password === '123456') {
      setUser(foundUser);
      setIsLoggedIn(true);
    } else {
      alert('Email ou senha incorretos. Use: lucas@inovatra.com.br / 123456');
    }
    setIsLoading(false);
  }, 1500);
};

const handleLogout = () => {
  setIsLoggedIn(false);
  setUser(null);
  setLoginForm({ email: '', password: '' });
};

const getRoleLabel = (role: string) => {
  switch (role) {
    case 'admin': return 'Administrador';
    case 'dentist': return 'Dentista';
    case 'receptionist': return 'Recepcionista';
    default: return 'Usuário';
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin' : return 'bg-red-100 text-red-800';
    case 'dentist' : return 'bg-blue-100 text-blue-800';
    case 'receptionist' : return 'bg-grenn-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

  // dados simulados para o dashboard
  const dashboardStats = [
    {label: 'Consultas Hoje', value: '12', icon: Calendar, color: 'bg-blue-500'},
    {label: 'Pacientes Ativos', value: '248', icon: User, color: 'bg-green-500'},
    {label: 'Receita Mensal', value: 'R$ 45.2k', icon: FileText, color: 'bg-purple-500'},
    {label: 'Taxa de Satisfação', value: '98%', icon: Shield, color: 'bg-orange-500'}
  ];

  const recentAppointments = [
    {id: 1, patient: 'João Silva', time: '09:00', service: 'Limpeza', status: 'confirmed'},
    {id: 2, patient: 'Maria Santos', time: '10:30', service: 'Ortodontia', status: 'pending'},
    {id: 3, patient: 'Pedro Costa', time: '14:00', service: 'Implante', status: 'completed'},
    {id: 4, patient: 'Ana Oliveira', time: '15:30', service: 'Estética', status: 'confirmed'}
  ];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed' : return 'bg-green-100 text-green-800';
    case 'pending' : return 'bg-yellow-100 text-yellow-800';
    case 'completed' : return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};  

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'confirmed' : return 'Confirmado';
    case 'pending' : return 'Pendente';
    case 'completed' : return 'Concluído';
    default: return 'Desconhecido';
  }
};

if (isLoggedIn && user) {
  // Dashboard da Área Restrita
  return (
      <div className="min-h-screen bg-gray-50">
        /* Header */
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              /* Logo e Título */
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">I</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Inovatra</h1>
                  <p className="text-sm text-gray-500">Área Restrita</p>
                </div>
              </div>

              /* Search Bar */
              <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar pacientes, agendamentos..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              /* User Menu */
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-gray-500">{getRoleLabel(user.role)}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        /* Main Content */
        <main className="max-w-7xl mx-auto px-4 py-8">
          /* Welcome Section */
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Bem-vindo {user.name.split(' ')[0]}!
            </h2>
            <p className="text-gray-600">
              Aqui está um resumo das atividades de hoje.
            </p>
          </div>

          /* Stats Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            /* Recent Appointments */
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Agendamentos de Hoje </h3>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  Ver todos </button>
              </div>

              <div className="space-y-4">
                {recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {appointment.patient}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.service}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-900">
                        {appointment.time}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusLabel(appointment.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            /* Quick Actions */
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Ações Rápidas </h3>

              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-purple-50 transition-colors group">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Novo Agendamento</p>
                    <p className="text-sm text-gray-500">Agendar consulta</p>
                  </div>
                </button>

                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-blue-50 transition-colors group">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Cadastrar Paciente</p>
                    <p className="text-sm text-gray-500">Novo paciente</p>
                  </div>
                </button>

                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-green-50 transition-colors group">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Relatórios</p>
                    <p className="text-sm text-gray-500">Ver relatórios</p>
                  </div>
                </button>

                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200">
                    <Settings className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Configurações</p>
                    <p className="text-sm text-gray-500">Ajustes do sistema</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };

  // Página de Login
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        /* Logo e Header */
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">I</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Área Restrita </h1>
          <p className="text-gray-600">
            Acesse o sistema de gestão da Smylink </p>
        </div>

        /* Login Form */
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            /* Email Field */
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            /* Password Field */
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={loginForm.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            /* Remember Me & Forgot Password */
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-600">Lembrar-me</span>
              </label>
              <button
                type="button"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Esqueci minha senha </button>
            </div>

            /* Submit Button */
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Entrando...
                </>
              ) : (
                'Entrar'
              )};
            </button>
          </form>

          /* Demo Credentials */
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <p className="text-sm font-medium text-purple-900 mb-2">
              Credenciais para Demo</p>
            <div className="text-sm text-purple-700 space-y-1">
              <p><strong>Admin:</strong> carlos@inovatra.com.br</p>
              <p><strong>Senha:</strong> 123456</p>
            </div>
          </div>
        </div>

        /* Footer */
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 Clínica Inovatra. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;