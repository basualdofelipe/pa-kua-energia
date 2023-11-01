import data from "../../assets/data/vias.json"
import { elementoPorId } from "./elementoPorId"
import { viasPorId } from "./viasPorId"

export function viasPorElementoId(id_elemento) {
    const elemento = elementoPorId(id_elemento)
    const yin = elemento.vias.yin.map(e => {
        return viasPorId(e)
    })
    const yang = elemento.vias.yang.map(e => {
        return viasPorId(e)
    })


    return ({yin: yin, yang: yang})
}