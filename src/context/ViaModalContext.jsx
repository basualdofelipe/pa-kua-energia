import { createContext, useState, useCallback } from 'react'

export const ViaModalContext = createContext(null)

export function ViaModalProvider({ children }) {
  const [vias, setVias] = useState([]) // Array de { via, tipo }
  const [currentIndex, setCurrentIndex] = useState(null)

  const openVia = useCallback((via, tipo) => {
    const index = vias.findIndex(v => v.via.id === via.id && v.tipo === tipo)
    if (index !== -1) {
      setCurrentIndex(index)
    }
  }, [vias])

  const closeModal = useCallback(() => {
    setCurrentIndex(null)
  }, [])

  const goNext = useCallback(() => {
    if (currentIndex !== null && currentIndex < vias.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }, [currentIndex, vias.length])

  const goPrev = useCallback(() => {
    if (currentIndex !== null && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }, [currentIndex])

  const registerVias = useCallback((newVias) => {
    setVias(newVias)
  }, [])

  const currentVia = currentIndex !== null ? vias[currentIndex] : null
  const hasNext = currentIndex !== null && currentIndex < vias.length - 1
  const hasPrev = currentIndex !== null && currentIndex > 0

  const value = {
    vias,
    currentVia,
    currentIndex,
    isOpen: currentIndex !== null,
    hasNext,
    hasPrev,
    openVia,
    closeModal,
    goNext,
    goPrev,
    registerVias,
    total: vias.length,
  }

  return (
    <ViaModalContext.Provider value={value}>
      {children}
    </ViaModalContext.Provider>
  )
}

