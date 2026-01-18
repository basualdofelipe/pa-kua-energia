import { MasajesHoy } from './components/features'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Pa-Kua Energía
          </h1>
          <p className="text-gray-600 mt-1">
            Masajes energéticos según medicina tradicional china
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <MasajesHoy />
      </main>

      <footer className="mt-auto py-6 text-center text-sm text-gray-500">
        <p>Basado en los principios de la medicina tradicional china</p>
      </footer>
    </div>
  )
}
