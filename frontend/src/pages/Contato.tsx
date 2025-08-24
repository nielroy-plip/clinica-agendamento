export default function Contato() {
  return (
    <section className="max-w-3xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">Fale Conosco</h2>
      <form className="bg-white shadow p-6 rounded-lg space-y-4">
        <input type="text" placeholder="Nome" className="w-full border p-3 rounded" />
        <input type="email" placeholder="Email" className="w-full border p-3 rounded" />
        <input type="tel" placeholder="Telefone" className="w-full border p-3 rounded" />
        <textarea placeholder="Mensagem" className="w-full border p-3 rounded" rows={4}></textarea>
        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
          Enviar
        </button>
      </form>
    </section>
  );
}