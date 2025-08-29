import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  User,
  MessageSquare
} from 'lucide-react';

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
}

const Contato: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });

  const [isSubmittting, setIsSubmitting] = useState(false);
  const [isSubmitting, setIsSubmmitintg] = useState(false);

  const handleInputChange = (e:
    React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          assunto: '',
          mensagem: ''
        });
      }, 3000);
    }, 2000);
  };

  const contactInfo = [
    {icon: Phone,
      title: 'Telefone',
      info: '(11) 911233454',
      subInfo: '(11) 911233454',
      action: 'tel+55511911233454'
    },
    {icon: Mail,
      title: 'E-mail',
      info: 'contato@teste.com',
      subInfo: '(11) 911233454',
      action: 'tel+55511911233454'
    },
    {icon: MapPin,
      title: 'Telefone',
      info: '(11) 911233454',
      subInfo: '(11) 911233454',
      action: 'tel+55511911233454'
    },
    {icon: Clock,
      title: 'Telefone',
      info: '(11) 911233454',
      subInfo: '(11) 911233454',
      action: 'tel+55511911233454'
    }
  ];

  const assuntos = [
    'Agendamento de Consulta',
    'Informações sobre Tratamentos',
    'Orçamento',
    'Emergência Odontológica',
    'Reclamação ou Sugestão',
    'Outros'
  ];

  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Contato</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Nossas Informações</h2>
          <div className="space-y-4">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <item.icon className="text-blue-500" size={32} />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p>{item.info}</p>
                  <p>{item.subInfo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Envie uma Mensagem</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium" htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="telefone">Telefone</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="assunto">Assunto</label>
              <select
                id="assunto"
                name="assunto"
                value={formData.assunto}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Selecione um assunto</option>
                {assuntos.map((assunto, index) => (
                  <option key={index} value={assunto}>{assunto}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="mensagem">Mensagem</label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contato;