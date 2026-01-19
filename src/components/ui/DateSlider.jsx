import { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import { useHemisferio } from '../../context/HemisferioContext'
import { estacion } from '../../utils/functions/estacion'
import { ELEMENTO_SLIDER_COLORS } from '../../utils/constants'
import { ChevronLeft, ChevronRight } from './Icons'

const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

// Helper para calcular días del año
const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
const getDaysInYear = (year) => isLeapYear(year) ? 366 : 365

/**
 * Slider interactivo para navegar fechas a lo largo del año
 */
export function DateSlider({ fecha, onChange, className = '' }) {
  const sliderRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const { hemisferio } = useHemisferio()

  // Calcular el día del año (0-365)
  const getDayOfYear = useCallback((date) => {
    const start = new Date(date.getFullYear(), 0, 0)
    const diff = date - start
    const oneDay = 1000 * 60 * 60 * 24
    return Math.floor(diff / oneDay)
  }, [])

  // Calcular segmentos de estaciones para el año
  const currentYear = fecha.getFullYear()
  const daysInYear = getDaysInYear(currentYear)
  const hemisferioCodigo = hemisferio === 'norte' ? 0 : 1

  const seasonSegments = useMemo(() => {
    const segments = []
    let currentSegment = null

    // Muestrear cada día del año para encontrar cambios de estación
    for (let day = 1; day <= daysInYear; day++) {
      const date = new Date(currentYear, 0, day)
      const [, , , elementoId] = estacion(date, hemisferioCodigo)
      const colors = ELEMENTO_SLIDER_COLORS[elementoId] || ELEMENTO_SLIDER_COLORS[4]

      if (!currentSegment || currentSegment.elementoId !== elementoId) {
        if (currentSegment) {
          currentSegment.end = (day - 1) / daysInYear
          segments.push(currentSegment)
        }
        currentSegment = {
          start: (day - 1) / daysInYear,
          end: 1,
          colors,
          elementoId,
        }
      }
    }

    if (currentSegment) {
      currentSegment.end = 1
      segments.push(currentSegment)
    }

    return segments
  }, [currentYear, daysInYear, hemisferioCodigo])

  // Calcular fecha desde posición (0-1)
  const getDateFromPosition = useCallback((position, year) => {
    const days = getDaysInYear(year)
    const dayOfYear = Math.round(position * days)
    const date = new Date(year, 0, dayOfYear + 1)
    return date
  }, [])

  // Posición actual (0-1)
  const position = (getDayOfYear(fecha) - 1) / daysInYear

  // Manejar click/drag en el slider
  const handleInteraction = useCallback((clientX) => {
    if (!sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const newPosition = Math.max(0, Math.min(1, x / rect.width))
    const newDate = getDateFromPosition(newPosition, currentYear)
    onChange(newDate)
  }, [currentYear, getDateFromPosition, onChange])

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true)
    handleInteraction(e.clientX)
  }, [handleInteraction])

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return
    handleInteraction(e.clientX)
  }, [isDragging, handleInteraction])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleTouchStart = useCallback((e) => {
    setIsDragging(true)
    handleInteraction(e.touches[0].clientX)
  }, [handleInteraction])

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return
    handleInteraction(e.touches[0].clientX)
  }, [isDragging, handleInteraction])

  // Event listeners globales para drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove])

  // Posiciones de los meses (inicio de cada mes como porcentaje)
  const monthPositions = meses.map((_, i) => {
    const startOfMonth = new Date(currentYear, i, 1)
    return (getDayOfYear(startOfMonth) - 1) / daysInYear
  })

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Año con navegación */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => onChange(new Date(currentYear - 1, fecha.getMonth(), fecha.getDate()))}
          className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-3 h-3 text-slate-400" />
        </button>
        <span className="text-xs font-medium text-slate-500 tabular-nums">{currentYear}</span>
        <button
          onClick={() => onChange(new Date(currentYear + 1, fecha.getMonth(), fecha.getDate()))}
          className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-3 h-3 text-slate-400" />
        </button>
      </div>

      {/* Contenedor del slider con área de click expandida */}
      <div
        ref={sliderRef}
        className={`relative h-8 flex items-center cursor-pointer select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Track del slider */}
        <div className="absolute left-0 right-0 h-2 rounded-full overflow-hidden shadow-inner" style={{ backgroundColor: '#e2e8f0' }}>
          {/* Segmentos de colores por estación con gradientes */}
          <div className="absolute inset-0 flex rounded-full overflow-hidden">
            {seasonSegments.map((segment, i) => (
              <div
                key={i}
                className="h-full"
                style={{
                  width: `${(segment.end - segment.start) * 100}%`,
                  background: `linear-gradient(90deg, ${segment.colors.from}, ${segment.colors.to})`,
                }}
              />
            ))}
          </div>

          {/* Brillo superior sutil */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent rounded-full" />

          {/* Marcadores de meses */}
          <div className="absolute inset-0">
            {monthPositions.slice(1).map((pos, i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-px h-1.5 bg-white/40"
                style={{ left: `${pos * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Handle */}
        <div
          className={`absolute w-4 h-4 bg-white rounded-full shadow-md border-2 border-white transition-transform duration-100 pointer-events-none ${
            isDragging ? 'scale-125' : ''
          }`}
          style={{
            left: `calc(${position * 100}% - 8px)`,
            boxShadow: '0 2px 6px rgba(0,0,0,0.2), 0 0 0 2px rgba(255,255,255,0.8)'
          }}
        />
      </div>

      {/* Labels de meses */}
      <div className="relative h-4 text-[9px] text-slate-400 font-medium tracking-wide">
        {meses.map((mes, i) => (
          <span
            key={i}
            className="absolute transform -translate-x-1/2 uppercase"
            style={{ left: `${(monthPositions[i] + (i < 11 ? (monthPositions[i + 1] - monthPositions[i]) / 2 : (1 - monthPositions[i]) / 2)) * 100}%` }}
          >
            {mes}
          </span>
        ))}
      </div>
    </div>
  )
}
