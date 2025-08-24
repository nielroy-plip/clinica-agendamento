export default function Login() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">Área Restrita</h2>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full border p-3 rounded" />
          <input type="password" placeholder="Senha" className="w-full border p-3 rounded" />
          <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
            Entrar
          </button>
        </form>
      </div>
    </section>
  );
}