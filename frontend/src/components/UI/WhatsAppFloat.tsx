import React from 'react';

const WhatsAppFloat = () => {
  const openWhatsApp = () => {
    const message = encondeURIComponent("Olá! Gostaria de agendar uma consulta na Clínica da Dr. Giullya Campos");
    window.open(`https://wa.me/5511954847912?text=${message}`, '_blank');
  };

  return (
    <div className="whatsapp-float" onClick={openWhatsApp}>
      <span>💬</span>
    </div>
  );
};

export default WhatsAppFloat;