import { estacion } from "../utils/functions/estacion"
import { Masajes } from "./Masajes"
import { elementoPorId } from "../utils/functions/elementoPorId"
import "./css/CalcFechas.scss"

export function CalcFechas({children, hemisferio}) {

    let res = estacion(children, hemisferio)
    const[estacionKey, inicio, fin, elementoId, nombre] = res
    
    return(
        <div className="calc-fechas">
            <div className="datos">
                <p>Estación: {nombre}</p>
                <p>Elemento: {elementoPorId(elementoId).elemento}</p>
                <p>Inicio: {inicio.toLocaleDateString()}</p>
                <p>Fin: {fin.toLocaleDateString()}</p>
            </div>
            <Masajes inicio={inicio} fin={fin} elementoId={elementoId} fecha={children}/>
        </div>
    )
}