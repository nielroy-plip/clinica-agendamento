import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Sobre a Inovatra</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Há mais de 10 anos cuidando do seu sorriso com excelência, inovação e humanização no atendimento.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Nossa História</h2>
            <p className="text-gray-600 mb-4">
              A Clínica Inovatra nasceu do sonho de oferecer tratamentos odontológicos de qualidade, 
              combinando tecnologia de ponta com atendimento humanizado.
            </p>
            <p className="text-gray-600 mb-4">
              Nossa equipe é formada por profissionais altamente qualificados, sempre em busca da 
              excelência e das mais modernas técnicas do mercado.
            </p>
            <p className="text-gray-600">
              Acreditamos que cada sorriso é único e merece cuidado personalizado e atenção especial.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary-light to-primary rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Nossos Valores</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="mr-3">✓</span> Excelência no atendimento
              </li>
              <li className="flex items-center">
                <span className="mr-3">✓</span> Inovação constante
              </li>
              <li className="flex items-center">
                <span className="mr-3">✓</span> Ética profissional
              </li>
              <li className="flex items-center">
                <span className="mr-3">✓</span> Cuidado humanizado
              </li>
              <li className="flex items-center">
                <span className="mr-3">✓</span> Transparência
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Nossa Equipe</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-white p-6 rounded-lg shadow-lg">
              <div className="w-24 h-24 bg-primary-light rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">👨‍⚕️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Carlos Silva</h3>
              <p className="text-primary font-medium mb-2">Diretor Clínico</p>
              <p className="text-gray-600 text-sm">Especialista em Implantodontia e Prótese</p>
            </div>
            
            <div className="card bg-white p-6 rounded-lg shadow-lg">
              <div className="w-24 h-24 bg-primary-light rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">👩‍⚕️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dra. Ana Costa</h3>
              <p className="text-primary font-medium mb-2">Ortodontista</p>
              <p className="text-gray-600 text-sm">Especialista em Ortodontia e Ortopedia Facial</p>
            </div>
            
            <div className="card bg-white p-6 rounded-lg shadow-lg">
              <div className="w-24 h-24 bg-primary-light rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">👨‍⚕️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Pedro Santos</h3>
              <p className="text-primary font-medium mb-2">Endodontista</p>
              <p className="text-gray-600 text-sm">Especialista em Endodontia e Clínica Geral</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;