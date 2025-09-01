import React from 'react';
import { 
  Users, 
  Award, 
  Heart, 
  Shield, 
  CheckCircle,
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  Target,
  Eye,
  Zap
} from 'lucide-react';

const Sobre: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Excelência no atendimento',
      description: 'Priorizamos o cuidadeo personalizado e a satisfação de cada paciente.'
    },
    {
      icon: Zap,
      title: 'Inovação constante',
      description: 'Investimos em tecnologias de ponta e técnicas modernas de tratamento.'
    },
    {
      icon: Shield,
      title: 'Ética profissional',
      description: 'Mantemos os mais altos padrões éticos em todos os nossos procedimentos.'
    },
    {
      icon: CheckCircle,
      title: 'Transpaência',
      description: 'Oferecemos informações claras sobre tratamentos, custos e procedimentos.'
    }
  ];

  const team = [
    {
      name: 'Dr. Carlos Silva',
      role: 'Diretor Clínico',
      specialty: 'Especialista em Implantodontia e Prótese',
      description: 'Mais de 15 anos de experiência em reabilitação oral e implantodontia avançada. Formado pela USP com especialização em Harvard.',
      achievements: ['CRO-SP 12345', 'Mestre em Implantodontia', '500+ implantes realizados']
    },
    {
      name: 'Dra. Ana Costa',
      role: 'Ortodontista',
      specialty: 'Especialista em Ortodontia e Ortopedia Facial',
      description: 'Especializada em alinhadores invisíveis e ortodontia interceptativa. Referência em tratamentos estéticos e funcionais.',
      achievements: ['CRO-SP 23456', 'Certificação Invisalign', '1000+ casos tratados']
    },
    {
      name: 'Dr. Pedro Santos',
      role: 'Endodontista',
      specialty: 'Especialista em Endodontia e Clínica Geral',
      description: 'Expert em tratamentos de canal com microscopia operatória. Pioneiro em técnicas minimamente invasivas.',
      achievements: ['CRO-SP 34567', 'Especialista em Endodontia', 'Microscopia Operatória']
    }
  ];

  const milestones = [
    {
      year: '2014',
      title: 'Fundação da Inovatra',
      description: 'Início das atividades com foco em atendimento humanizado e tecnologia avançada.'
    },
    {
      year: '2017',
      title: 'Expansão da Equipe',
      description: 'Contratação de especialistas em diferentes áreas da odontologia.'
    },
    {
      year: '2019',
      title: 'Modernização Tecnológica',
      description: 'Investimento em equipamentos de última geração e digitalização dos processos.'
    },
    {
      year: '2021',
      title: 'Certificação de Qualidade',
      description: 'Reconhecimento por órgãos reguladores pela excelência em atendimento.'
    },
    {
      year: '2024',
      title: 'Mais de 10.000 Sorrisos',
      description: 'Marco histórico de pacientes atendidos com excelência e satisfação.'
    }
  ];

  const stats = [
    {number: '10+', label: 'Anos de Experiência', icon: Calendar},
    {number: '10k+', label: 'Pacientes Atendidos', icon: Users},
    {number: '98%', label: 'Satisfação dos Clientes', icon: Star},
    {number: '24h', label: 'Atendimento Emergencial', icon: Clock}
  ];

  const certifications = [
    'Conselho Regional de Odontologia (CRO)',
    'ISO 9001 - Gestão da Qualidade',
    'Certificação em Biossegurança',
    'Anvisa - Vigilância Sanitária',
    'Certificação Invisaling Provider',
    'Credenciamento Hospitalar'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sobre a Inovatra
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Há mais de 10 anos cuidando do seu sorriso com excelência, inovação e 
            humanização no atendimento. Conheça nossa história e nossos valores.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-purple-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  A Clínica Inovatra nasceu em 2014 do sonho de oferecer tratamentos 
                  odontológicos de qualidade, combinando tecnologia de ponta com 
                  atendimento humanizado e personalizado.
                </p>
                <p>
                  Nossa equipe é formada por profissionais altamente qualificados, 
                  sempre em busca da excelência e das mais modernas técnicas do 
                  mercado. Investimos constantemente em educação continuada e 
                  equipamentos de última geração.
                </p>
                <p>
                  Acreditamos que cada sorriso é único e merece cuidado personalizado 
                  e atenção especial. Por isso, desenvolvemos planos de tratamento 
                  individualizados, respeitando as necessidades e expectativas de 
                  cada paciente.
                </p>
                <p>
                  Hoje, após mais de uma década de dedicação, orgulhamo-nos de ter 
                  transformado mais de 10.000 sorrisos e de manter uma taxa de 
                  satisfação de 98% entre nossos pacientes.
                </p>
              </div>
            </div>
            
            <div className="bg-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Nossos Valores</h3>
              <div className="space-y-4">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <value.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{value.title}</h4>
                      <p className="text-purple-100 text-sm">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossa Trajetória
            </h2>
            <p className="text-xl text-gray-600">
              Principais marcos da nossa história de crescimento e inovação
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-purple-200 hidden lg:block"></div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:space-x-8`}>
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} mb-4 lg:mb-0`}>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="text-purple-600 font-bold text-lg mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-4 h-4 bg-purple-600 rounded-full border-4 border-white shadow-lg relative z-10 hidden lg:block"></div>

                  <div className="w-full lg:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossa Equipe
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça os profissionais dedicados que cuidam do seu sorriso com 
              excelência, experiência e carinho.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-12 h-12 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 font-medium mb-1">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {member.specialty}
                  </p>
                </div>

                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {member.description}
                </p>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Qualificações:</h4>
                  <ul className="space-y-2">
                    {member.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-center text-sm text-gray-600">
                        <Award className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Nossa Missão
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Proporcionar tratamentos odontológicos de excelência, combinando 
                tecnologia avançada com atendimento humanizado, para transformar 
                sorrisos e melhorar a qualidade de vida dos nossos pacientes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Nossa Visão
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ser reconhecida como referência em odontologia, sendo a primeira 
                escolha dos pacientes que buscam excelência, inovação e cuidado 
                personalizado em tratamentos odontológicos.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Nossos Valores
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ética, transparência, excelência técnica, inovação constante, 
                respeito ao paciente e compromisso com resultados que superem 
                expectativas em cada atendimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificações */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Certificações e Credenciamentos
            </h2>
            <p className="text-xl text-gray-600">
              Reconhecimentos que garantem a qualidade e segurança dos nossos serviços
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Venha nos Conhecer Pessoalmente
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="w-6 h-6 text-purple-200" />
              <div className="text-left">
                <p className="font-semibold">Endereço</p>
                <p className="text-purple-100 text-sm">Rua das Flores, 123 - Centro</p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3">
              <Phone className="w-6 h-6 text-purple-200" />
              <div className="text-left">
                <p className="font-semibold">Telefone</p>
                <p className="text-purple-100 text-sm">(11) 3456-7890</p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3">
              <Mail className="w-6 h-6 text-purple-200" />
              <div className="text-left">
                <p className="font-semibold">E-mail</p>
                <p className="text-purple-100 text-sm">contato@inovatra.com.br</p>
              </div>
            </div>
          </div>

          <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Agendar uma Visita
          </button>
        </div>
      </section>
    </div>
  );
};

export default Sobre;