import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  Calendar,
  Star,
  Award,
  Heart,
  CheckCircle
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Tecnologia Avançada',
      description: 'Equipamentos modernos e técnicas inovadoras para tratamentos mais eficazes.'
    },
    {
      icon: Users,
      title: 'Profissionais Qualificados',
      description: 'Equipe especializada com anos de experiência e formação continuada.'
    },
    {
      icon: Calendar,
      title: 'Agendamento Fácil',
      description: 'Sistema online prático para marcar e gerenciar suas consultas.'
    }
  ];

  const team = [
    {
      name: 'Dr. Carlos Silva',
      specialty: 'Diretor Clínico',
      description: 'Especialista em Implantodontia e Prótese',
      image: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: 'Dra. Ana Costa',
      specialty: 'Ortodontista',
      description: 'Especialista em Ortodontia e Ortopedia Facial',
      image: 'https://i.pravatar.cc/150?img=2'
    },
    {
      name: 'Dr. Pedro Santos',
      specialty: 'Endodontista',
      description: 'Especialista em Endodontia e Clínica Geral',
      image: 'https://i.pravatar.cc/150?img=3'
    }
  ];

  const values = [
    'Excelência no atendimento',
    'Inovação constante',
    'Ética profissional',
    'Cuidado humanizado',
    'Transparência'
  ];

 return (
  <div className="min-h-screen">
    <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Seu Sorriso é Nossa Prioridade </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100 leading-relaxed">
            Clínica odontológica moderna com tecnologia de ponta e profissionais especializados para cuidar da sua saúde bucal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/agendamento" className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Agende sua Consulta </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Por que escolher a Smylink </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra os diferenciais que fazem da nossa clínica a melhor escolha para o seu tratamento odontológico.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <feature.icon className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              </h3>
              <p className="text-gray-600 leading-relaxed">
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nossa História </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              A Clínica Inovatra nasceu do sonho de oferecer tratamentos odontológicos de qualidade combinando tecnologia de ponta com atendimento humanizado.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Nossa equipe é formada por profissionais altamente qualificadossempre em busca da excelência e das mais modernas técnicas do mercado.</p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Acreditamos que cada sorriso é único e merece cuidado personalizado e atenção especial.</p> 
          </div>
          
          <div className="bg-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Nossos Valores</h3>
            <ul className="space-y-4">
              {values.map((value, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-200" />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossa Equipe </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça os profissionais dedicados que cuidam do seu sorriso com excelência e carinho. </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-purple-200 transition-colors">
                  <Users className="w-16 h-16 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {member.name}
              </h3>
              <p className="text-purple-600 font-medium mb-3">
                {member.specialty}
              </p>
              <p className="text-gray-600 text-sm">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center"> 
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para transformar seu sorriso?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Agende sua consulta e descubra como podemos cuidar da sua saúde bucal com excelência e carinho.</p>
          <Link to="/agendamento" className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"> Agendar Consulta </Link>
        </div>
      </div>
    </section>
  </div>
  );
};

export default Home;