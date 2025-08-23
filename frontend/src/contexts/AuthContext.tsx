import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used whitin an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [use, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      //verificar se o token é válido
      api.defaults.headers.Authorization = `Bearer ${token}`;
      // adicionar uma verificação de token com o backend
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password, isDentist = false) => {
    try {
      const endpoint = isDentist ? '/auth/dentist/login' : '/auth/patient/login';
      const response = await api.post(endpoint, { email, password });

      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);

      //configurar o token para todas as requisições
      api.defaults.headers.Authorization = `Bearer ${token}`;

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || 'Erro ao fazer login'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete api.defaults.headers.Authorization;
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      </AuthContext.Provider>
  );
};

export default AuthContext;