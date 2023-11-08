
import { calculoSedTonCaniculaPorFecha } from "../utils/functions/calculoSedTonCaniculaPorFecha";

export function Masajes({inicio, fin, elementoId, fecha}) {

    const datos = calculoSedTonCaniculaPorFecha(inicio, fin, elementoId, fecha)
    const sedacion = datos.sedacion.cant
    const tonificacion = datos.tonificacion.cant
    const canicula = datos.canicula.cant
    const tipoCanicula = datos.canicula.tipo ? "Tonificación" : "Sedación"

    return(
        <>
            <h1>{new Date(fecha).toLocaleDateString()} Sedaciones</h1>
            <h1>{sedacion} Sedaciones</h1>
            <h1>{tonificacion} Tonificaciones</h1>
            <h1>{canicula} {tipoCanicula} canicula</h1>
        </>
    )

    
}