import { estacion } from "../utils/functions/estacion"

export function CalcFechas2({children}) {

    //let res = estacion(new Date(2023, 11, 23), 0)
    let res = estacion(children, 0)
    const[inicio, fin, elementoId] = res

    return(
        <>
            <h1>Estacion actual</h1>
            <div>
                <p>Elemento: {elementoId}</p>
                <p>Inicio: {inicio.toLocaleDateString()}</p>
                <p>Fin: {fin.toLocaleDateString()}</p>
            </div>
        </>
    )
}