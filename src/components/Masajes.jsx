import { Vias } from "./Vias"
import { calculoSedTonCaniculaPorFecha } from "../utils/functions/calculoSedTonCaniculaPorFecha";

export function Masajes({inicio, fin, elementoId, fecha}) {

    const datos = calculoSedTonCaniculaPorFecha(inicio, fin, elementoId, fecha)
    const sedacion = datos.sedacion
    const tonificacion = datos.tonificacion
    const canicula = datos.canicula
    const tipoCanicula = datos.canicula.tipo ? "Tonificación" : "Sedación"

    return(
        <>
            <h1>{new Date(fecha).toLocaleDateString()} Sedaciones</h1>
            <h1>{sedacion.cant} Sedaciones</h1>
            <Vias>
                {sedacion.elemento_id}
            </Vias>
            <h1>{tonificacion.cant} Tonificaciones</h1>
            <Vias>
                {tonificacion.elemento_id}
            </Vias>
            <h1>{canicula.cant} {tipoCanicula} canicula</h1>
            <Vias>
                {canicula.elemento_id}
            </Vias>
        </>
    )

    
}