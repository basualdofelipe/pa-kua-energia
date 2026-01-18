import { useEffect } from 'react'
import { useViaModal } from '../../context/ViaModalContext'

/**
 * Modal global para mostrar vías con navegación estilo carousel
 */
export function ViaModal() {
  const {
    currentVia,
    isOpen,
    hasNext,
    hasPrev,
    closeModal,
    goNext,
    goPrev,
  } = useViaModal()

  // Navegación con teclado y cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight' && hasNext) goNext()
      if (e.key === 'ArrowLeft' && hasPrev) goPrev()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, hasNext, hasPrev, goNext, goPrev, closeModal])

  if (!isOpen || !currentVia) return null

  const { via, tipo } = currentVia
  const punto = tipo === 'sedacion' ? via.masaje.sedacion : via.masaje.tonificacion
  const imagenUrl = `${import.meta.env.BASE_URL}img/vias_de_energia/${via.imagen}`

  const formatHorario = (horario) => {
    if (!horario || horario.length !== 2) return ''
    return `${horario[0]}:00 - ${horario[1]}:00`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Flecha izquierda */}
      {hasPrev && (
        <button
          onClick={goPrev}
          className="absolute left-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Flecha derecha */}
      {hasNext && (
        <button
          onClick={goNext}
          className="absolute right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Modal content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-[80vw] max-h-[90vh] overflow-hidden flex flex-col mx-16">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{via.via}</h2>
          <button
            onClick={closeModal}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col lg:flex-row gap-6 h-full">
            {/* Imagen - izquierda */}
            <div className="lg:w-1/2 flex-shrink-0 bg-gray-50 rounded-xl p-4 flex items-center justify-center">
              <img
                src={imagenUrl}
                alt={`Vía de ${via.via}`}
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>

            {/* Info - derecha */}
            <div className="lg:w-1/2 space-y-5">
              {/* Punto de masaje destacado */}
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-800 mb-1">
                  Punto de {tipo}
                </p>
                <p className="text-blue-900 text-lg">{punto}</p>
              </div>

              {/* Info adicional */}
              <div className="space-y-4">
                {via.horario_max_actividad && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Máxima actividad</p>
                      <p className="text-gray-600 text-lg">{formatHorario(via.horario_max_actividad)}</p>
                    </div>
                  </div>
                )}

                {via.acoplado && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Acoplado</p>
                      <p className="text-gray-600 text-lg">{via.acoplado}</p>
                    </div>
                  </div>
                )}

                {via.funcion && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Función</p>
                      <p className="text-gray-600">{via.funcion}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
