import { Card, CardContent, Badge } from '../ui'

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
  const punto = tipo === 'sedacion' ? via.masaje.sedacion : via.masaje.tonificacion

  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <p className="font-medium text-gray-900">{via.via}</p>
      <p className="text-sm text-gray-600 mt-1">{punto}</p>
    </div>
  )
}
