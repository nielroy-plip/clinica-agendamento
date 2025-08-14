import { useState } from 'react';
import axios from 'axios';

function App() {
  const [appointments, setAppointments] = useState([]);

  const handleCreateAppointment = async () => {
    const response = await axios.post('http://localhost:3001/api/appointments', {
      paciente: "João Silva",
      data: "2023-10-30T14:00:00",
      procedimento: "Limpeza"
    });
    console.log(response.data)
  };

  return (
    <div>
      <h1>Sistema de Agendamento Odontológico</h1>
      <button onClick={handleCreateAppointment}>Criar Agendamento</button>
    </div>
  )
}

export default App;
