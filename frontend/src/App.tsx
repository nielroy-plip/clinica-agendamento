import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import Booking from '../pages/Booking';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import PatientDashboard from '../pages/PatientDashboard';
import DentistDashboard from '../pages/DentistDashboard';
import './styles/globals.css';

function App() {
  return (
    <AuthContext>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/patient-dashboard" element={<PatientDashboard />} />
              <Route path="/dentist-dashboard" element={<DentistDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthContext>
  );
}


export default App;
