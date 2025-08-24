const servicos = [
  { titulo: "Limpeza Dental", desc: "Higienização completa e prevenção de cáries." },
  { titulo: "Clareamento", desc: "Deixe seu sorriso mais branco e saudável." },
  { titulo: "Implantes", desc: "Reposição de dentes com segurança e tecnologia." },
];

export default function Servicos() {
  return (
    <section className="max-w-5xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-purple-700">Nossos Serviços</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {servicos.map((s, i) => (
          <div key={i} className="bg-white shadow p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">{s.titulo}</h3>
            <p className="text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}