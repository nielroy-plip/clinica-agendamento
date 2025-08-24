import { useEffect, useState } from 'react';
import { api } from '../services/api';

type Appointment = {
  id: number,
  patientName: string;
  date: string;
};

export default function Agendamentos() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    api.get<Appointment[]>("/appointments")
    .then(res => setAppointments(res.data))
    .catch(console.error);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Agendamentos</h2>
      <div className="grid gap-4">
        {appointments.map(appt => (
          <div key={appt.id} className="p-4 bg-white rounded-lg shadow">
            <p className="font-medium">{appt.patientName}</p>
            <p className="text-gray-600">{new Date(appt.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}