import { estacion } from "../utils/functions/estacion"
import { diasEntreFechas } from "../utils/functions/diasEntreFechas"
import { elementoPorId } from "../utils/functions/elementoPorId"

export function CalcFechas2({children, hemisferio}) {

    //let res = estacion(new Date(2023, 11, 23), 0)
    let res = estacion(children, hemisferio)
    const[inicio, fin, elementoId, nombre] = res
       

    return(
        <>
            <h1>Estacion actual</h1>
            <div>
                <p>Estación: {nombre}</p>
                <p>Elemento: {elementoPorId(elementoId).elemento}</p>
                <p>Inicio: {inicio.toLocaleDateString()}</p>
                <p>Fin: {fin.toLocaleDateString()}</p>

            </div>
        </>
    )
}