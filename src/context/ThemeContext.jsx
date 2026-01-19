import { createContext, useContext, useMemo } from 'react'
import { useHemisferio } from './HemisferioContext'
import { useDate } from './DateContext'
import { estacion } from '../utils/functions/estacion'
import { ELEMENTO_NAMES } from '../utils/constants'

const ThemeContext = createContext(null)

/**
 * Colores por elemento/estación
 */
const elementoThemes = {
  madera: {
    id: 1,
    primary: 'from-green-600 to-emerald-700',
    primarySolid: 'bg-green-600',
    secondary: 'from-green-50 to-emerald-50',
    accent: '#16a34a',
    accentLight: '#bbf7d0',
    text: 'text-green-600',
    border: 'border-green-200',
    yinColor: '#166534',
    yangColor: '#dcfce7',
    chino: '木',
  },
  fuego: {
    id: 2,
    primary: 'from-red-600 to-orange-600',
    primarySolid: 'bg-red-600',
    secondary: 'from-red-50 to-orange-50',
    accent: '#dc2626',
    accentLight: '#fecaca',
    text: 'text-red-600',
    border: 'border-red-200',
    yinColor: '#991b1b',
    yangColor: '#fef2f2',
    chino: '火',
  },
  tierra: {
    id: 3,
    primary: 'from-amber-500 to-yellow-600',
    primarySolid: 'bg-amber-500',
    secondary: 'from-amber-50 to-yellow-50',
    accent: '#d97706',
    accentLight: '#fde68a',
    text: 'text-amber-600',
    border: 'border-amber-200',
    yinColor: '#92400e',
    yangColor: '#fefce8',
    chino: '土',
  },
  metal: {
    id: 4,
    primary: 'from-slate-600 to-gray-700',
    primarySolid: 'bg-slate-600',
    secondary: 'from-slate-50 to-gray-100',
    accent: '#475569',
    accentLight: '#e2e8f0',
    text: 'text-slate-600',
    border: 'border-slate-200',
    yinColor: '#334155',
    yangColor: '#f8fafc',
    chino: '金',
  },
  agua: {
    id: 5,
    primary: 'from-blue-600 to-cyan-600',
    primarySolid: 'bg-blue-600',
    secondary: 'from-blue-50 to-cyan-50',
    accent: '#2563eb',
    accentLight: '#bfdbfe',
    text: 'text-blue-600',
    border: 'border-blue-200',
    yinColor: '#1e40af',
    yangColor: '#eff6ff',
    chino: '水',
  },
}

export function ThemeProvider({ children }) {
  const { hemisferio, loading } = useHemisferio()
  const { fechaSeleccionada } = useDate()

  const theme = useMemo(() => {
    if (loading || !hemisferio) {
      // Tema por defecto (metal/neutro) mientras carga
      return {
        ...elementoThemes.metal,
        elemento: null,
        estacion: null,
        loading: true,
      }
    }

    const hemisferioCodigo = hemisferio === 'norte' ? 0 : 1
    const [nombreEstacion, , , elementoId, nombreCompleto] = estacion(fechaSeleccionada, hemisferioCodigo)

    if (!nombreEstacion) {
      return {
        ...elementoThemes.metal,
        elemento: null,
        estacion: null,
        loading: false,
      }
    }

    const elementoName = ELEMENTO_NAMES[elementoId] || 'metal'

    return {
      ...elementoThemes[elementoName],
      elemento: elementoName,
      estacion: nombreCompleto,
      loading: false,
    }
  }, [hemisferio, loading, fechaSeleccionada])

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider')
  }
  return context
}
