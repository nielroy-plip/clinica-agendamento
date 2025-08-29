import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Agendamentos from "./pages/Agendamentos.tsx";
import Contato from "./pages/Contato.tsx";
import Login from "./pages/Login.tsx";
import Sobre from './pages/Sobre.tsx'
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agendamentos" element={<Agendamentos />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;