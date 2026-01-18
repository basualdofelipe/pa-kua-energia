import { Card, CardContent, Badge } from '../ui'
import { useViaModal } from '../../context/ViaModalContext'

const elementoVariant = {
  1: 'madera',
  2: 'fuego',
  3: 'tierra',
  4: 'metal',
  5: 'agua',
}

const tipoLabels = {
  sedacion: 'Sedación',
  tonificacion: 'Tonificación',
}

/**
 * Card que muestra un tipo de masaje con sus vías y puntos
 */
export function MasajeCard({ masaje, className = '' }) {
  if (!masaje || !masaje.cant) return null

  const variant = elementoVariant[masaje.elemento_id]
  const tipoLabel = tipoLabels[masaje.tipo]

  return (
    <Card className={`border-l-4 border-l-${variant === 'madera' ? 'green' : variant === 'fuego' ? 'red' : variant === 'tierra' ? 'yellow' : variant === 'metal' ? 'gray' : 'blue'}-500 ${className}`}>
      <CardContent>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant={masaje.tipo}>{tipoLabel}</Badge>
            <Badge variant={variant}>{masaje.elemento?.elemento}</Badge>
          </div>
          <span className="text-2xl font-bold text-gray-800">
            {masaje.cant}x
          </span>
        </div>

        <div className="space-y-2">
          {masaje.vias?.yin?.map((via) => (
            <ViaInfo key={via.id} via={via} tipo={masaje.tipo} />
          ))}
          {masaje.vias?.yang?.map((via) => (
            <ViaInfo key={via.id} via={via} tipo={masaje.tipo} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ViaInfo({ via, tipo }) {
  const { openVia } = useViaModal()
  const punto = tipo === 'sedacion' ? via.masaje.sedacion : via.masaje.tonificacion

  return (
    <button
      onClick={() => openVia(via, tipo)}
      className="w-full text-left bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors flex items-center justify-between group"
    >
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900">{via.via}</p>
        <p className="text-sm text-gray-600 mt-0.5 truncate">{punto}</p>
      </div>
      <svg
        className="w-5 h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0 ml-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )
}
