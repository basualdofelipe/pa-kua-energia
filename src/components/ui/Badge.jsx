/**
 * Componente Badge para mostrar etiquetas/tags
 */
const variants = {
  default: 'bg-slate-100 text-slate-700',
  madera: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-sm shadow-green-500/30',
  fuego: 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-sm shadow-red-500/30',
  tierra: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900 shadow-sm shadow-amber-500/30',
  metal: 'bg-gradient-to-r from-slate-400 to-gray-500 text-white shadow-sm shadow-slate-500/30',
  agua: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm shadow-blue-500/30',
  sedacion: 'bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-sm shadow-orange-500/30',
  tonificacion: 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-sm shadow-purple-500/30',
}

export function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
