import { estacion } from "../utils/functions/estacion"
import { Vias } from "./Vias"
import { Masajes } from "./Masajes"
import { elementoPorId } from "../utils/functions/elementoPorId"

export function CalcFechas2({children, hemisferio}) {

    let res = estacion(children, hemisferio)
    const[estacionKey, inicio, fin, elementoId, nombre] = res
    
    return(
        <>
            <h1>Estacion actual</h1>
            <div>
                <p>Estación: {nombre}</p>
                <p>Elemento: {elementoPorId(elementoId).elemento}</p>
                <p>Inicio: {inicio.toLocaleDateString()}</p>
                <p>Fin: {fin.toLocaleDateString()}</p>

                <Vias>
                    {elementoId}
                </Vias>

                <Masajes inicio={inicio} fin={fin} elementoId={elementoId} fecha={children}/>

            </div>
        </>
    )
}