import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">INOVATRA Odonto</h1>
      <div className="space-x-6 font-medium">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/sobre" className="hover:underline">Sobre</Link>
        <Link to="/servicos" className="hover:underline">Serviços</Link>
        <Link to="/agendamentos" className="hover:underline">Agendamentos</Link>
        <Link to="/contato" className="hover:underline">Contato</Link>
        <Link to="/login" className="bg-white text-purple-700 px-3 py-1 rounded-lg shadow hover:bg-gray-100 transition">
          Área Restrita
        </Link>
      </div>
    </nav>
  );
}