import { viasPorElementoId } from "../utils/functions/viasPorElementoId";
import "./css/Vias.scss"
import { elementoPorId } from "../utils/functions/elementoPorId";

export function Vias({children, cantidad, tipo, elementoId}){
    const viasYin = viasPorElementoId(children).yin
    const viasYang = viasPorElementoId(children).yang
    const source = "./img/vias_de_energia/"

    // console.log(elementoId)

    return (
        <div className={tipo + ", vias"}>
            <div className="vias-total">
                <span className="vias-header">
                    <h1>{elementoPorId(elementoId).elemento}</h1>
                    <h1>{tipo + " " + cantidad}</h1>
                </span>
                <span  className="vias-conjunto">
                    {[...viasYin, ...viasYang].map((e, index) => (
                        <div className="vias-viaparticular" key={index}>
                            <img src={source + e.imagen} alt="" />
                            <p>Punto de {tipo == "sedacion" ? "sedación: " + e.masaje.sedacion : "tonificación: " + e.masaje.tonificacion}</p>
                            <p>Horario máxima actividad: {e.horario_max_actividad[0]}hs a {e.horario_max_actividad[1]}hs</p>
                        </div>
                    ))}
                </span>
            </div>
        </div>
    );

}