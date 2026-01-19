import { useEffect } from 'react'
import { useViaModal } from '../../hooks/useViaModal'
import { ChevronLeft, ChevronRight, Close, Clock, Link, CheckCircle } from '../ui'

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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={closeModal}
      />

      {/* Flecha izquierda */}
      {hasPrev && (
        <button
          onClick={goPrev}
          className="absolute left-4 z-10 w-14 h-14 flex items-center justify-center rounded-full
                     bg-white/95 hover:bg-white shadow-xl border border-slate-100
                     transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-fade-in"
        >
          <ChevronLeft className="w-6 h-6 text-slate-700" />
        </button>
      )}

      {/* Flecha derecha */}
      {hasNext && (
        <button
          onClick={goNext}
          className="absolute right-4 z-10 w-14 h-14 flex items-center justify-center rounded-full
                     bg-white/95 hover:bg-white shadow-xl border border-slate-100
                     transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-fade-in"
        >
          <ChevronRight className="w-6 h-6 text-slate-700" />
        </button>
      )}

      {/* Modal content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-[80vw] max-h-[90vh] overflow-hidden flex flex-col mx-16 animate-zoom-in">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <h2 className="text-2xl font-bold text-slate-900">{via.via}</h2>
          <button
            onClick={closeModal}
            className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <Close className="w-5 h-5 text-slate-500" />
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
              <div className={`rounded-2xl p-5 ${
                tipo === 'sedacion'
                  ? 'bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100'
                  : 'bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100'
              }`}>
                <p className={`text-sm font-semibold mb-2 ${
                  tipo === 'sedacion' ? 'text-orange-600' : 'text-purple-600'
                }`}>
                  Punto de {tipo}
                </p>
                <p className={`text-xl font-medium ${
                  tipo === 'sedacion' ? 'text-orange-900' : 'text-purple-900'
                }`}>{punto}</p>
              </div>

              {/* Info adicional */}
              <div className="space-y-4">
                {via.horario_max_actividad && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-amber-600" />
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
                      <Link className="w-5 h-5 text-purple-600" />
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
                      <CheckCircle className="w-5 h-5 text-green-600" />
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
