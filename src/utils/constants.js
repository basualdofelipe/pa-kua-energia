/**
 * Constantes compartidas para elementos de la medicina tradicional china
 */

// Mapeo de ID a nombre de elemento
export const ELEMENTO_NAMES = {
  1: 'madera',
  2: 'fuego',
  3: 'tierra',
  4: 'metal',
  5: 'agua',
}

// Mapeo de nombre a ID de elemento
export const ELEMENTO_IDS = {
  madera: 1,
  fuego: 2,
  tierra: 3,
  metal: 4,
  agua: 5,
}

// Labels de tipos de masaje
export const TIPO_LABELS = {
  sedacion: 'Sedaci\u00f3n',
  tonificacion: 'Tonificaci\u00f3n',
}

// Colores de borde por elemento (Tailwind classes)
export const ELEMENTO_BORDER_COLORS = {
  madera: 'border-l-green-500',
  fuego: 'border-l-red-500',
  tierra: 'border-l-yellow-500',
  metal: 'border-l-gray-500',
  agua: 'border-l-blue-500',
}

// Colores para slider por elemento ID
export const ELEMENTO_SLIDER_COLORS = {
  1: { from: '#22c55e', to: '#10b981' }, // madera - verde
  2: { from: '#f87171', to: '#fb923c' }, // fuego - rojo/naranja
  3: { from: '#fbbf24', to: '#f59e0b' }, // tierra - \u00e1mbar
  4: { from: '#94a3b8', to: '#64748b' }, // metal - slate
  5: { from: '#60a5fa', to: '#38bdf8' }, // agua - azul/cyan
}
