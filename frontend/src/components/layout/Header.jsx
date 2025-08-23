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

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flaex items-center">
            <Link to="/" className="flex-items-center">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-x1">I</span>
            </div>
            <span className="text-2x1 font-bold text-gray-800">Inovatra</span>
            </Link>
          </div>
          {/* Desktop Navigation*/}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}>
                  {item.name}
                </Link>
            ))}

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700">
                  <span>Olá, {user.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 2 4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                  to={user.role === 'dentist' ? '/dentist-dashboard' : '/patient-dashboard'}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sair
                  </button>
                </div>
              </div>
            ) : (
              <Link
              to="/login"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Área Restrita
              </Link>
            )}
          </div>

          {/* Mobile menu botton*/}
          <div className="md:hidden flex items-center">
            <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className=""text-gray-600 hover:text-gray-900
            >
              <svg className="h-6 w06" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/*Mobile Navigation*/}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-mediom ${isActive(item.path)
                  ? 'text-primary bg-primary-light'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                  onClick={() => setIsMenuOpen(false)}>
                    {item.name}
                  </Link>
              ))}
              {user ? (
                <>
                <Link
                to={user.role === 'dentist' ? '/dentist-dashboard' : '/patient-dashboard'}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  Sair
                </button>
                </>
              ) : (
                <Link
                to="/login"
                className="block px -py rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
                >
                  Área Restrita
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;