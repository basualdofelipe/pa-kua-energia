import { useMemo } from 'react'
import { useHemisferio } from '../../context/HemisferioContext'
import { useMasajesDelDia } from '../../hooks/useMasajesDelDia'
import { Card, CardHeader, CardTitle, CardContent, Toggle } from '../ui'
import { MasajeCard } from './MasajeCard'

const hemisferioOptions = [
  { value: 'norte', label: '🌎 Norte' },
  { value: 'sur', label: '🌍 Sur' },
]

/**
 * Componente principal que muestra los masajes del día
 */
export function MasajesHoy() {
  const { hemisferio, setHemisferio, loading } = useHemisferio()
  const hoy = useMemo(() => new Date(), [])
  const data = useMasajesDelDia(hoy, hemisferio)

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-gray-500">Detectando ubicación...</div>
      </div>
    )
  }

  const fechaFormateada = hoy.toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="space-y-6">
      {/* Header con fecha y selector de hemisferio */}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">Hoy</p>
              <p className="text-lg font-medium capitalize">{fechaFormateada}</p>
            </div>
            <Toggle
              options={hemisferioOptions}
              value={hemisferio}
              onChange={setHemisferio}
            />
          </div>
        </CardContent>
      </Card>

      {/* Info de la estación actual */}
      {data && (
        <Card>
          <CardHeader>
            <CardTitle>
              Estación: {data.estacion.nombre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Elemento: <span className="font-medium">{data.estacion.elemento?.elemento}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {data.estacion.fechaInicio.toLocaleDateString('es-AR')} - {data.estacion.fechaFin.toLocaleDateString('es-AR')}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Masajes del día */}
      {data && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Masajes para hoy
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MasajeCard masaje={data.masajes.sedacion} />
            <MasajeCard masaje={data.masajes.tonificacion} />
            <MasajeCard masaje={data.masajes.canicula} />
          </div>
        </div>
      )}
    </div>
  )
}
