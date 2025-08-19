import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface User {
  id: number;
  name: string
}

interface AuthContextData {
  user: User | null;
  login: (email: string, password: string, isDentist: boolean) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // verificar token válido
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string, isDentist: boolean) => {
    try {
      const endpoint = isUser ? '/auth/dentist/login' : '/auth/patient/login';
      const response = await api.post(endpoint, { email, password });

      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
    } catch (error) {
      throw new Error('Login falhou');
    }
  };

  const logout = () => {
    localStorage.removeItem('toke');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
      </AuthContext.Provider>
  )
}