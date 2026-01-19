import { Card, CardContent, Badge, ChevronRight } from '../ui'
import { useViaModal } from '../../hooks/useViaModal'
import { ELEMENTO_NAMES, ELEMENTO_BORDER_COLORS, TIPO_LABELS } from '../../utils/constants'

/**
 * Card que muestra un tipo de masaje con sus vías y puntos
 */
export function MasajeCard({ masaje, className = '' }) {
  if (!masaje || !masaje.cant) return null

  const variant = ELEMENTO_NAMES[masaje.elemento_id]
  const tipoLabel = TIPO_LABELS[masaje.tipo]

  return (
    <Card className={`border-l-4 ${ELEMENTO_BORDER_COLORS[variant]} ${className}`}>
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
      className="w-full text-left bg-gradient-to-r from-slate-50 to-white rounded-xl p-4
                 border border-slate-100 hover:border-slate-200
                 hover:shadow-md hover:from-white hover:to-slate-50
                 transition-all duration-300 flex items-center justify-between group overflow-hidden"
    >
      <div className="flex-1 min-w-0 overflow-hidden">
        <p className="font-medium text-slate-800 group-hover:text-slate-900 truncate">{via.via}</p>
        <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">{punto}</p>
      </div>
      <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors ml-3 flex-shrink-0">
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
      </div>
    </button>
  )
}
