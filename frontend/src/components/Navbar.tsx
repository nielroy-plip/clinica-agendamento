import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    {path: '/', label: 'Home'},
    {path: '/Sobre', label: 'Sobre'},
    {path: '/Servico', label: 'Serviços'},
    {path: '/agendamento', label: 'Agendamento'},
    {path: '/contato', label: 'Contato'}
  ];

  const isActive = (path: string) => location.pathname === path;

   return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Smylink</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/area-restrita"
              className="btn btn-primary text-sm"
            >
              Área Restrita
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium px-2 py-1 rounded transition-colors ${
                    isActive(item.path)
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/area-restrita"
                onClick={() => setIsMenuOpen(false)}
                className="btn btn-primary text-sm w-fit"
              >
                Área Restrita
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;