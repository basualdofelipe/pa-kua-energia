import { useState, useEffect } from 'react'

/**
 * Hook para obtener la geolocalización del usuario
 * @returns {{ latitude: number|null, loading: boolean, error: string|null }}
 */
export function useGeolocation() {
  const [state, setState] = useState({
    latitude: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        latitude: null,
        loading: false,
        error: 'Geolocalización no soportada',
      })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          loading: false,
          error: null,
        })
      },
      (error) => {
        setState({
          latitude: null,
          loading: false,
          error: error.message,
        })
      },
      { timeout: 10000, maximumAge: 86400000 } // Cache por 24hs
    )
  }, [])

  return state
}
