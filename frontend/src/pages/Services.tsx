import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: '🦷',
      title: 'Clínica Geral',
      description: 'Consultas de rotina, limpeza, restaurações e tratamentos preventivos.',
      price: 'A partir de R$ 80'
    },
    {
      icon: '😁',
      title: 'Ortodontia',
      description: 'Aparelhos fixos, móveis e alinhadores invisíveis para correção dentária.',
      price: 'A partir de R$ 150'
    },
    {
      icon: '🔧',
      title: 'Implantodontia',
      description: 'Implantes dentários com tecnologia avançada e materiais de qualidade.',
      price: 'A partir de R$ 800'
    },
    {
      icon: '✨',
      title: 'Estética Dental',
      description: 'Clareamento, facetas, lentes de contato dental e harmonização.',
      price: 'A partir de R$ 200'
    },
    {
      icon: '🩺',
      title: 'Endodontia',
      description: 'Tratamento de canal com tecnologia rotatória e microscopia.',
      price: 'A partir de R$ 300'
    },
    {
      icon: '🦴',
      title: 'Cirurgia Oral',
      description: 'Extrações, cirurgias de siso e procedimentos cirúrgicos menores.',
      price: 'A partir de R$ 120'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Nossos Serviços</h1>
          <p className="text-xl text-gray-600">
            Oferecemos uma ampla gama de tratamentos odontológicos com tecnologia de ponta.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div key={index} className="card bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">{service.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">{service.title}</h3>
              <p className="text-gray-600 mb-4 text-center">{service.description}</p>
              <p className="text-primary font-semibold text-center">{service.price}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Pronto para Transformar Seu Sorriso?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Agende sua consulta e descubra como podemos ajudar você a alcançar o sorriso dos seus sonhos.
          </p>
          <Link
            to="/booking"
            className="btn-primary text-white px-8 py-4 rounded-lg text-lg font-semibold inline-block"
          >
            Agendar Consulta
          </Link>
        </div>
      </div>
    </div>
  );
};


  export default Services;

