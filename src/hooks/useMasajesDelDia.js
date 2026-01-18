import { useMemo } from 'react'
import { estacion } from '../utils/functions/estacion'
import { calculoSedTonCaniculaPorFecha } from '../utils/functions/calculoSedTonCaniculaPorFecha'
import { viasPorElementoId } from '../utils/functions/viasPorElementoId'
import { elementoPorId } from '../utils/functions/elementoPorId'

/**
 * Hook que calcula los masajes del día según la fecha y hemisferio
 * @param {Date} fecha - Fecha para calcular
 * @param {string} hemisferio - 'norte' o 'sur'
 * @returns {Object} - Información de masajes del día
 */
export function useMasajesDelDia(fecha, hemisferio) {
  return useMemo(() => {
    if (!hemisferio) return null

    const hemisferioCodigo = hemisferio === 'norte' ? 0 : 1
    const [nombreEstacion, fechaInicio, fechaFin, elementoId, nombreCompleto] =
      estacion(fecha, hemisferioCodigo)

    if (!nombreEstacion) return null

    const masajes = calculoSedTonCaniculaPorFecha(
      fechaInicio,
      fechaFin,
      elementoId,
      fecha
    )

    const elemento = elementoPorId(elementoId)

    // Obtener vías para cada tipo de masaje
    const viasEstacion = viasPorElementoId(elementoId)
    const viasSiguiente = viasPorElementoId(masajes.tonificacion.elemento_id)
    const viasCanicula = viasPorElementoId(3) // Tierra siempre para canícula

    return {
      fecha,
      hemisferio,
      estacion: {
        nombre: nombreCompleto,
        key: nombreEstacion,
        fechaInicio,
        fechaFin,
        elemento: elemento,
      },
      masajes: {
        sedacion: {
          ...masajes.sedacion,
          elemento: elementoPorId(masajes.sedacion.elemento_id),
          vias: viasEstacion,
        },
        tonificacion: masajes.tonificacion.cant ? {
          ...masajes.tonificacion,
          elemento: elementoPorId(masajes.tonificacion.elemento_id),
          vias: viasSiguiente,
        } : null,
        canicula: masajes.canicula.cant ? {
          ...masajes.canicula,
          elemento: elementoPorId(3),
          vias: viasCanicula,
        } : null,
      },
    }
  }, [fecha, hemisferio])
}
