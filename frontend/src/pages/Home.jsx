import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Sections/Hero';
import Services from '../components/Sections/Services';
import WhatsAppFloat from '../components/UI/WhatsAppFloat';

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <WhatsAppFloat />
    </div>
  );
};

export default Home;