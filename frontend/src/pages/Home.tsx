export default function Home() {
  return (
    <section className="text-center py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <h1 className="text-5xl font-bold mb-6">Bem-vindo à INOVATRA Odonto</h1>
      <p className="text-lg mb-8">Cuidamos do seu sorriso com tecnologia e carinho.</p>
      <a
        href="/agendamentos"
        className="bg-white text-purple-700 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
      >
        Agende sua consulta
      </a>
    </section>
  );
}