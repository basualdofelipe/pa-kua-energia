import { useContext } from 'react'
import { ViaModalContext } from '../context/ViaModalContext'

export function useViaModal() {
  const context = useContext(ViaModalContext)
  if (!context) {
    throw new Error('useViaModal debe usarse dentro de ViaModalProvider')
  }
  return context
}
