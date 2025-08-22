import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    {name: 'Inicio', path: '/'},
    {name: 'Sobre', path: '/about'},
    {name: 'Serviços', path: '/services'},
    {name: 'Agendamento', path: '/booking'},
    {name: 'Contato', path: '/contact'},
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  
}