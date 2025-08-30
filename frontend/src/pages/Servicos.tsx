import React, { useState } from 'react';
import {
  Shield,
  Smile,
  Zap,
  Star,
  Heart,
  Award,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  ArrowRight
} from 'lucide-react';

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  popular?: boolean;
}

const Servicos: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const services: Service[] = [
    {
      id: 'clinica-geral',
      icon: Shield,
      title: 'Clínica Geral',
      description: 'Consultas de rotina, limpeza, restaurações e tratamentos preventivos.',
      price: 'A partir de R$ 80',
      duration: '45-60 min',
      features: ['Consulta completa', 'Limpeza profissional', 'Orientações preventivas', 'Raio-X digital'],
      popular: true
    },
    {
      id: 'ortodontia',
      icon: Smile,
      title: 'Ortodontia',
      description: 'Aparelhos fixos, móveis e alinhadores invisíveis para correção dentária.',
      price: 'A partir de R$ 150',
      duration: '30-45 min',
      features: ['Aparelhos tradicionais', 'Alinhadores invisíveis', 'Acompanhamento mensal', 'Plano de tratamento']
    },
    {
      id: 'implantodontia',
      icon: Zap,
      title: 'Implantodontia',
      description: 'Implantes dentários com tecnologia avançada e materiais de qualidade.',
      price: 'A partir de R$ 800',
      duration: '60-90 min',
      features: ['Implantes de titânio', 'Cirurgia guiada', 'Próteses personalizadas', 'Garantia estendida'],
      popular: true
    },
    {
      id: 'estetica',
      icon: Star,
      title: 'Estética Dental',
      description: 'Tratamentos para melhorar a aparência e harmonia do seu sorriso.',
      price: 'A partir de R$ 100',
      duration: '60-120 min',
      features: ['Clareamento dental', 'Facetas de porcelana', 'Lentes de contato', 'Harmonização facial']
    },
    {
      id: 'endodontia',
      icon: Heart,
      title: 'Endodontia',
      description: 'Tratamento de canal com tecnologia moderna e anestesia eficaz.',
      price: 'A partir de R$ 300',
      duration: '60-90 min',
      features: ['Tratamento de canal', 'Microscopia operatória', 'Anestesia sem dor', 'Retratamento']
    },
    {
      id: 'cirurgia',
      icon: Award,
      title: 'Cirurgia Oral',
      description: 'Extrações, cirurgias e procedimentos orais especializados.',
      price: 'A partir de R$ 200',
      duration: '30-60 min',
      features: ['Extrações simples', 'Cirurgias complexas', 'Pós-operatório assistido', 'Sedação consciente']
    }
  ];

  const categories = [
    {id: 'todos', name: 'Todos os Serviços'},
    {id: 'preventivo', name: 'Preventivo'},
    {id: 'estetico', name: 'Estético'},
    {id: 'cirurgico', name: 'Cirúrgico'}
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Profissionais Especializados',
      description: 'Equipe com certificações e experiência comprovada em cada área.'
    },
    {
      icon: Shield,
      title: 'Tecnologia Avançada',
      description: 'Equipamentos modernos para diagnósticos precisos e tratamentos eficazes.'
    },
    {
      icon: Heart,
      title: 'Atendimento Humanizado',
      description: 'Cuidado personalizado com foco no conforto e bem-estar do paciente.'
    },
    {
      icon: CheckCircle,
      title: 'Garantia de Qualidade',
      description: 'Todos os tratamentos com garantia e acompanhamento pós-procedimento.'
    }
  ];

  const filteredServices = selectedCategory === 'todos'
    ? services
    : services.filter(service => {
      if (selectedCategory === 'preventivo') return ['clinica-geral'].includes(service.id);
      if (selectedCategory === 'estetico') return ['ortodontia', 'estetica'].includes(service.id);
      if (selectedCategory === 'cirurgico') return ['implantodontia', 'endodontia', 'cirurgia'].includes(service.id);
      return true;
    });

    return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nossos Serviços </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos uma ampla gama de tratamentos odontológicos com tecnologia de ponta e profissionais especializados para cuidar da sua saúde bucal.
          </p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div 
                key={service.id} 
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative group"
              >
                {service.popular && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Mais Procurado
                    </span>
                  </div>
                )}

                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                  <service.icon className="w-8 h-8 text-purple-600" />
                </div>
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Price and Duration */}
                <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-purple-600">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span className="font-semibold text-sm">{service.price}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{service.duration}</span>
                  </div>
                </div>
                
                {/* Features */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-3">Inclui:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* CTA Button */}
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors group flex items-center justify-center">
                  Agendar Consulta <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))};
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher nossos serviços</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combinamos experiência tecnologia e cuidado personalizado para oferecer os melhores resultados em cada tratamento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4"> Como funciona nosso atendimento</h2>
            <p className="text-xl text-gray-600">
              Um processo simples e transparente do primeiro contato até o resultado final.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Agendamento',
                description: 'Agende sua consulta online ou por telefone de forma rápida e prática.'
              },
              {
                step: '02',
                title: 'Avaliação',
                description: 'Consulta completa com diagnóstico detalhado e plano de tratamento.'
              },
              {
                step: '03',
                title: 'Tratamento',
                description: 'Procedimento realizado com tecnologia avançada e máximo conforto.'
              },
              {
                step: '04',
                title: 'Acompanhamento',
                description: 'Seguimento pós-tratamento para garantir os melhores resultados.'
              }
            ].map((process, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {process.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {process.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {process.description}
                </p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-purple-300 mx-auto" />
                  </div>
                )};
              </div>
            ))};
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para cuidar do seu sorriso </h2>
          <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Agende sua consulta e descubra qual é o melhor tratamento para você. 
            Nossa equipe está pronta para te atender</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Agendar Consulta </button>
            <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-700 transition-colors"> Falar no WhatsApp </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servicos;