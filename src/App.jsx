import { MasajesHoy } from './components/features'
import { YinYang } from './components/ui'
import { useTheme } from './context/ThemeContext'

// Mapeo de estaciones a caracteres chinos
const estacionChinos = {
  'primavera': '春',
  'verano': '夏',
  'otoño': '秋',
  'invierno': '冬',
  'canícula': '長夏',
  'interestación': '土',
}

const getEstacionChino = (nombreEstacion) => {
  if (!nombreEstacion) return ''
  const nombreLower = nombreEstacion.toLowerCase()
  for (const [key, value] of Object.entries(estacionChinos)) {
    if (nombreLower.includes(key)) return value
  }
  return ''
}

export default function App() {
  const theme = useTheme()

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.secondary}`}>
      <header className={`bg-gradient-to-r ${theme.primary} text-white shadow-xl transition-colors duration-500 overflow-hidden`}>
        <div className="max-w-4xl mx-auto px-4 py-4 relative">
          {/* Caracter de la estación gigante - centro con offset izquierdo */}
          {!theme.loading && theme.estacion && (
            <span
              className="absolute left-1/2 -translate-x-1/2 -ml-8 sm:-ml-10 top-1/2 -translate-y-1/2 text-[90px] sm:text-[120px] font-serif text-white/20 select-none pointer-events-none leading-none"
              aria-hidden="true"
            >
              {getEstacionChino(theme.estacion)}
            </span>
          )}

          {/* Caracter del elemento gigante - derecha */}
          {!theme.loading && theme.chino && (
            <span
              className="absolute right-0 sm:right-8 top-1/2 -translate-y-1/2 text-[90px] sm:text-[120px] font-serif select-none pointer-events-none leading-none"
              style={{ color: theme.accentLight, opacity: 0.3 }}
              aria-hidden="true"
            >
              {theme.chino}
            </span>
          )}

          {/* Grid de 3 columnas: Logo | Estación (centro) | Elemento */}
          <div className="grid grid-cols-3 items-center relative z-10">
            {/* Logo y título - izquierda */}
            <div className="flex items-center gap-3">
              <YinYang
                size={36}
                yinColor={theme.yinColor}
                yangColor={theme.yangColor}
                className="drop-shadow-lg"
              />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white drop-shadow-sm">
                  Pa-Kua Energía
                </h1>
                <p className="text-white/60 text-xs">
                  Masajes energéticos
                </p>
              </div>
            </div>

            {/* Estación - centro (solo texto) */}
            {!theme.loading && theme.estacion && (
              <div className="text-center">
                <span className="text-xl sm:text-2xl font-bold text-white capitalize drop-shadow-sm">
                  {theme.estacion}
                </span>
              </div>
            )}

            {/* Elemento - derecha (solo texto) */}
            {!theme.loading && theme.elemento && (
              <div className="text-right">
                <span
                  className="text-lg sm:text-xl font-bold capitalize drop-shadow-sm"
                  style={{ color: theme.accentLight }}
                >
                  {theme.elemento}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <MasajesHoy />
      </main>

      <footer className={`mt-12 py-8 text-center border-t ${theme.border}`}>
        <p className="text-sm text-slate-500">
          Basado en los principios de la medicina tradicional china
        </p>
      </footer>
    </div>
  )
}
