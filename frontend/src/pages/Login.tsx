import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDentist, setIsDentist] = useState(true);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, isDentist);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Crecenciais inválidas');
    }
  };

  
}