/**
 * Componente Badge para mostrar etiquetas/tags
 */
const variants = {
  default: 'bg-gray-100 text-gray-800',
  madera: 'bg-green-100 text-green-800',
  fuego: 'bg-red-100 text-red-800',
  tierra: 'bg-yellow-100 text-yellow-800',
  metal: 'bg-gray-200 text-gray-700',
  agua: 'bg-blue-100 text-blue-800',
  sedacion: 'bg-orange-100 text-orange-800',
  tonificacion: 'bg-purple-100 text-purple-800',
}

export function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
