import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useGeolocation } from '../hooks/useGeolocation'

const HemisferioContext = createContext(null)

export function HemisferioProvider({ children }) {
  const [hemisferio, setHemisferio] = useLocalStorage('hemisferio', null)
  const { latitude, loading: geoLoading, error: geoError } = useGeolocation()

  // Auto-detectar hemisferio si no está guardado
  useEffect(() => {
    if (hemisferio === null && !geoLoading && latitude !== null) {
      setHemisferio(latitude >= 0 ? 'norte' : 'sur')
    }
  }, [hemisferio, geoLoading, latitude, setHemisferio])

  // Default a 'sur' si no hay geolocalización y no hay valor guardado
  useEffect(() => {
    if (hemisferio === null && !geoLoading && geoError) {
      setHemisferio('sur')
    }
  }, [hemisferio, geoLoading, geoError, setHemisferio])

  const toggleHemisferio = () => {
    setHemisferio((prev) => (prev === 'norte' ? 'sur' : 'norte'))
  }

  const value = {
    hemisferio,
    setHemisferio,
    toggleHemisferio,
    loading: geoLoading && hemisferio === null,
  }

  return (
    <HemisferioContext.Provider value={value}>
      {children}
    </HemisferioContext.Provider>
  )
}

export function useHemisferio() {
  const context = useContext(HemisferioContext)
  if (!context) {
    throw new Error('useHemisferio debe usarse dentro de HemisferioProvider')
  }
  return context
}
