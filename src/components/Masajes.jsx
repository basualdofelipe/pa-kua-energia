import { Vias } from "./Vias"
import { calculoSedTonCaniculaPorFecha } from "../utils/functions/calculoSedTonCaniculaPorFecha";
import './css/Masajes.scss'

export function Masajes({inicio, fin, elementoId, fecha}) {

    const datos = calculoSedTonCaniculaPorFecha(inicio, fin, elementoId, fecha)

    return(
        <div className="masajes">

            {Object.entries(datos).map(([key, value], index) => (
                value.cant ?
                <Vias key={index} cantidad={value.cant} tipo={value.tipo} elementoId={value.elemento_id}>
                    {value.elemento_id}
                </Vias> :
                null
            ))}
            
        </div>
    )

    
}