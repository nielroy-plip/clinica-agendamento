import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/booking">Booking</Link>
        <Link to="/contact">Contact</Link>
        
        {isAuthenticated ? (
          <div>
            <span>Welcome, {user?.name}</span>
            <button onClick={logout}>Logout</button>
            <Link to={user?.role === 'patient' ? '/patient-dashboard' : '/dentist-dashboard'}>
              Dashboard
            </Link>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;