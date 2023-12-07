import { viasPorElementoId } from "../utils/functions/viasPorElementoId";

export function Vias({children}){
    const viasYin = viasPorElementoId(children).yin
    const viasYang = viasPorElementoId(children).yang
    const source = "./img/vias_de_energia/"

    return (
        <div>
            <h2>Vías</h2>
            {[...viasYin, ...viasYang].map((e, index) => (
            <>
                <p key={index}>{e.via}</p>
                <img src={source + e.imagen} alt="" />
            </>
        ))}
        </div>
    );

}