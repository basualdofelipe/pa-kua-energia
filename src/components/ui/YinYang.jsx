/**
 * Componente SVG del Yin Yang clásico
 * Colores personalizables para adaptarse a la estación
 */
export function YinYang({
  size = 48,
  yinColor = '#1e293b',  // Lado oscuro (yin)
  yangColor = '#f8fafc', // Lado claro (yang)
  className = ''
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
    >
      {/* Círculo exterior */}
      <circle cx="50" cy="50" r="48" fill={yangColor} stroke={yinColor} strokeWidth="2" />

      {/* Mitad yin (oscura) */}
      <path
        d="M50 2 A48 48 0 0 1 50 98 A24 24 0 0 1 50 50 A24 24 0 0 0 50 2"
        fill={yinColor}
      />

      {/* Punto yin en yang (punto oscuro en lado claro - arriba) */}
      <circle cx="50" cy="26" r="8" fill={yinColor} />

      {/* Punto yang en yin (punto claro en lado oscuro - abajo) */}
      <circle cx="50" cy="74" r="8" fill={yangColor} />
    </svg>
  )
}
