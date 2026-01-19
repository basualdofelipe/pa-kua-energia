import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const DateContext = createContext(null)

/**
 * Provider para la fecha seleccionada
 * Permite compartir la fecha entre componentes y que el tema cambie dinámicamente
 */
export function DateProvider({ children }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(() => new Date())

  const irAHoy = useCallback(() => setFechaSeleccionada(new Date()), [])

  const esHoy = useMemo(() => {
    const hoy = new Date()
    return fechaSeleccionada.toDateString() === hoy.toDateString()
  }, [fechaSeleccionada])

  return (
    <DateContext.Provider value={{
      fechaSeleccionada,
      setFechaSeleccionada,
      irAHoy,
      esHoy,
    }}>
      {children}
    </DateContext.Provider>
  )
}

export function useDate() {
  const context = useContext(DateContext)
  if (!context) {
    throw new Error('useDate debe usarse dentro de DateProvider')
  }
  return context
}
