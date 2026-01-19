import { useEffect, useCallback } from 'react'
import { useHemisferio } from '../../context/HemisferioContext'
import { useDate } from '../../context/DateContext'
import { useViaModal } from '../../hooks/useViaModal'
import { useMasajesDelDia } from '../../hooks/useMasajesDelDia'
import { DateSlider, ChevronLeft, ChevronRight, Calendar } from '../ui'
import { MasajeCard } from './MasajeCard'
import { ViaModal } from './ViaModal'

/**
 * Componente principal que muestra los masajes del día
 */
export function MasajesHoy() {
  const { hemisferio, setHemisferio, loading } = useHemisferio()
  const { fechaSeleccionada, setFechaSeleccionada, irAHoy, esHoy } = useDate()
  const { registerVias } = useViaModal()
  const data = useMasajesDelDia(fechaSeleccionada, hemisferio)

  // Navegación día a día
  const irDiaAnterior = useCallback(() => {
    const nuevaFecha = new Date(fechaSeleccionada)
    nuevaFecha.setDate(nuevaFecha.getDate() - 1)
    setFechaSeleccionada(nuevaFecha)
  }, [fechaSeleccionada, setFechaSeleccionada])

  const irDiaSiguiente = useCallback(() => {
    const nuevaFecha = new Date(fechaSeleccionada)
    nuevaFecha.setDate(nuevaFecha.getDate() + 1)
    setFechaSeleccionada(nuevaFecha)
  }, [fechaSeleccionada, setFechaSeleccionada])

  // Registrar todas las vías del día para navegación
  useEffect(() => {
    if (!data) {
      registerVias([])
      return
    }

    const extractVias = (masaje) => {
      if (!masaje?.vias) return []
      return [
        ...(masaje.vias.yin || []).map(via => ({ via, tipo: masaje.tipo })),
        ...(masaje.vias.yang || []).map(via => ({ via, tipo: masaje.tipo })),
      ]
    }

    const { sedacion, tonificacion, canicula } = data.masajes
    registerVias([
      ...extractVias(sedacion),
      ...extractVias(tonificacion),
      ...extractVias(canicula),
    ])
  }, [data, registerVias])

  // Skeleton de carga
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Skeleton barra de fecha */}
        <div className="grid grid-cols-3 items-center gap-3">
          <div className="h-9 w-24 bg-slate-200 rounded-lg"></div>
          <div className="flex items-center justify-center gap-1">
            <div className="h-9 w-9 bg-slate-200 rounded-lg"></div>
            <div className="h-9 w-[140px] bg-slate-200 rounded-lg"></div>
            <div className="h-9 w-9 bg-slate-200 rounded-lg"></div>
          </div>
          <div className="flex justify-end">
            <div className="h-9 w-[72px] bg-slate-200 rounded-lg"></div>
          </div>
        </div>

        {/* Skeleton slider */}
        <div className="space-y-2">
          <div className="flex justify-center gap-4">
            <div className="w-6 h-6 bg-slate-200 rounded"></div>
            <div className="w-12 h-4 bg-slate-200 rounded"></div>
            <div className="w-6 h-6 bg-slate-200 rounded"></div>
          </div>
          <div className="h-8 bg-slate-200 rounded-full"></div>
          <div className="h-4 bg-slate-100 rounded"></div>
        </div>

        {/* Skeleton masajes */}
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="card border-l-4 border-l-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                  <div className="h-6 bg-slate-200 rounded-full w-16"></div>
                </div>
                <div className="h-8 bg-slate-200 rounded w-10"></div>
              </div>
              <div className="space-y-3">
                <div className="h-16 bg-slate-100 rounded-xl"></div>
                <div className="h-16 bg-slate-100 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Formato de fecha corto para la barra
  const fechaCorta = fechaSeleccionada.toLocaleDateString('es-AR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })

  return (
    <div className="space-y-6">
      {/* Barra de navegación compacta - grid de 3 columnas para centrar fecha */}
      <div className="grid grid-cols-3 items-center gap-3">
        {/* Toggle hemisferio - izquierda */}
        <div className="flex rounded-lg border border-slate-200 overflow-hidden text-sm w-fit">
          <button
            onClick={() => setHemisferio('norte')}
            className={`px-3 py-1.5 transition-colors ${
              hemisferio === 'norte'
                ? 'bg-slate-800 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            🌎 N
          </button>
          <button
            onClick={() => setHemisferio('sur')}
            className={`px-3 py-1.5 transition-colors border-l border-slate-200 ${
              hemisferio === 'sur'
                ? 'bg-slate-800 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            🌍 S
          </button>
        </div>

        {/* Navegación de fecha con flechas - centro */}
        <div className="flex items-center justify-center gap-1">
          {/* Flecha izquierda */}
          <button
            onClick={irDiaAnterior}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
            aria-label="Día anterior"
          >
            <ChevronLeft />
          </button>

          {/* Fecha clickeable con calendario - ancho fijo */}
          <div className="relative">
            <input
              type="date"
              value={fechaSeleccionada.toISOString().split('T')[0]}
              onChange={(e) => {
                const fecha = new Date(e.target.value + 'T12:00:00')
                if (!isNaN(fecha.getTime())) {
                  setFechaSeleccionada(fecha)
                }
              }}
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
            />
            <div className="flex items-center justify-center gap-2 w-[140px] py-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer shadow-sm">
              <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="text-sm font-medium text-slate-700 capitalize">
                {esHoy ? 'Hoy' : fechaCorta}
              </span>
            </div>
          </div>

          {/* Flecha derecha */}
          <button
            onClick={irDiaSiguiente}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
            aria-label="Día siguiente"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Botón Hoy - derecha (o placeholder) */}
        <div className="flex justify-end">
          {!esHoy ? (
            <button
              onClick={irAHoy}
              className="px-3 py-2 text-sm font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              Ir a hoy
            </button>
          ) : (
            <div className="w-[72px]"></div>
          )}
        </div>
      </div>

      {/* Slider de fecha anual */}
      <DateSlider
        fecha={fechaSeleccionada}
        onChange={setFechaSeleccionada}
      />

      {/* Tarjetas de masajes - ancho completo */}
      {data && (
        <div className="space-y-4">
          <MasajeCard masaje={data.masajes.sedacion} />
          <MasajeCard masaje={data.masajes.tonificacion} />
          <MasajeCard masaje={data.masajes.canicula} />
        </div>
      )}

      {/* Modal global de vías */}
      <ViaModal />
    </div>
  )
}
