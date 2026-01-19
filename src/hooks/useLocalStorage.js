import { useState, useEffect } from 'react'

/**
 * Hook para persistir estado en localStorage
 * @param {string} key - Clave para guardar en localStorage
 * @param {*} initialValue - Valor inicial si no existe en storage
 * @returns {[*, function]} - [valor, setter]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      // Silently fail - localStorage might be full or disabled
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
